import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import { useEffect } from "react";
import { getpaymentdetails } from "@/State/Withdrawal/Action";
const WithdrawalForm = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const { wallet, withdrawal } = useSelector((store) => store);

  const { PaymentDetails, loading } = useSelector((state) => state.withdrawal);
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };


  useEffect(() => {
    dispatch(getpaymentdetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);


  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
    console.log(amount);
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>${wallet.userwallet.balance }</p>
      </div>
      <div className="flex flex-col items-center">
        <h1>Enter Withdrawal Amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer To</p>
        {/* Display the bank name and account number */}
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <p className="text-xl font-bold">{PaymentDetails?.bankname || "Bank not set"}</p>
          <p className="text-xs ">{PaymentDetails?.accountno || "Account not set"}</p>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full py-7 text-xl">
          Withdraw
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
