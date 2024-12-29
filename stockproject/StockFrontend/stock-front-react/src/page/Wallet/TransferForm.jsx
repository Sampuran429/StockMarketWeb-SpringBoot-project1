import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { transferMoney } from "@/State/Wallet/Action"

const TransferForm = () => {
  const dispatch = useDispatch()
  const { wallet } = useSelector(store => store)
  const [formdata, setFormData] = useState({ amount: '', walletId: '', purpose: '' })

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Validate input before dispatching action
    if (!formdata.amount || !formdata.walletId || !formdata.purpose) {
      console.error("All fields are required");
      return;
    }

    dispatch(transferMoney({
      jwt: localStorage.getItem("jwt"),
      walletId: formdata.walletId,
      reqdata: {
        amount: formdata.amount,
        purpose: formdata.purpose
      }
    }));
    console.log(formdata);
  }

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formdata.amount}
          className="py-7"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className="pb-1">Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formdata.walletId}
          className="py-7"
          placeholder="#ADER455"
        />
      </div>

      <div>
        <h1 className="pb-1">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formdata.purpose}
          className="py-7"
          placeholder="gift"
        />
      </div>
      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full py-7">
          Submit
        </Button>
      </DialogClose>
    </div>
  )
}

export default TransferForm
