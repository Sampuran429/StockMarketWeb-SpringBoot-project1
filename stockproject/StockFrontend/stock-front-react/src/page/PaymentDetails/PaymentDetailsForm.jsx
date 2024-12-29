import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";  // Added useSelector to access loading and error state
import { addpaymentdetails } from "@/State/Withdrawal/Action";

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.withdrawal);  // Access loading and error states

  const form = useForm({
    resolver: "",  // Ensure resolver is correctly implemented
    defaultValues: {
      accounholdername: "",
      accountno: "",
      bankname: "",
      ifsc: ""
    }
  });

  const onSubmit = (data) => {
    dispatch(
      addpaymentdetails({
        paymentdetails: data,
        jwt: localStorage.getItem("jwt")
      })
    );
  };

  return (
    <div className="px-10 py-2 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          <FormField
            control={form.control}
            name="accountholdername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="abc" {...field} className="border w-full border-gray-700 p-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account No</FormLabel>
                <FormControl>
                  <Input placeholder="10101" {...field} className="border w-full border-gray-700 p-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BankName</FormLabel>
                <FormControl>
                  <Input placeholder="yesbank" {...field} className="border w-full border-gray-700 p-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC</FormLabel>
                <FormControl>
                  <Input placeholder="BCI229320" {...field} className="border w-full border-gray-700 p-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <DialogClose className="w-full">
            <Button type="submit" className="w-full py-5" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogClose>
          {error && <p className="text-red-500 text-sm">{error}</p>}  {/* Display error if exists */}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
