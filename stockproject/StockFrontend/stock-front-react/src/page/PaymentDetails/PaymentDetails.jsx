import { Card, CardDescription, CardHeader, CardContent} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  // Now using useSelector for state management
import { getpaymentdetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { PaymentDetails, loading } = useSelector((state) => state.withdrawal);

  useEffect(() => {
    dispatch(getpaymentdetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10 text-left">Payment Details</h1>

      {/* Show Loading Indicator */}
      {loading && <p>Loading payment details...</p>}

      {/* Conditionally Render Payment Details or Form */}
      {PaymentDetails ? (
        <Card className="text-left">
          <CardHeader>
            <CardDescription>A/C HolderName: {PaymentDetails.accountholdername}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C No</p>
              <p className="text-gray-400 ml-2">: {PaymentDetails.accountno}</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">BankName</p>
              <p className="text-gray-400 ml-2">: {PaymentDetails.bankname}</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400 ml-2">: {PaymentDetails.ifsc}</p>
            </div>

          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-left mt-6">
              <Button className="py-2">Add Payment Details</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm className="pt-1" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
