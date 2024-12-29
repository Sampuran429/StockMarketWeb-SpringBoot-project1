import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InputOTPGroup, InputOTPSlot, InputOTP, InputOTPSeparator } from "@/components/ui/input-otp"
import { useState } from "react"

const AccountVerificationForm = () => {
  const [value, setValue] = useState("")

  // Update OTP value
  const handleOTPChange = (newValue) => {
    setValue(newValue)
  }

  // Submit handler for OTP form
  const handleSubmit = () => {
    console.log(value)
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        <div className="flex justify-between items-center">
          <p>Email:</p>
          <p>abc@gmail.com</p>
          <Dialog>
            <DialogTrigger>
              <Button>Send Otp</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="otp-description">
              <DialogHeader>
                <div className="py-5 flex gap-10 justify-center items-center">
                  <InputOTP
                    value={value}
                    onChange={handleOTPChange} // Proper onChange handler
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>
              <DialogClose>
                <Button
                  onClick={handleSubmit} // Fixed onClick
                  className="w-[10rem]"
                >
                  Submit
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default AccountVerificationForm
