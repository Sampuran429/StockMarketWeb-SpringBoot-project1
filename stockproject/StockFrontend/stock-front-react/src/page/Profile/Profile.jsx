import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VerifiedIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AccountVerificationForm from "./AccountVerificationForm"
import { Dialog,DialogContent,DialogTitle,DialogHeader,DialogTrigger } from "@/components/ui/dialog"
import { useSelector } from "react-redux"
const Profile = () => {
  const {auth}=useSelector(store=>store)

  const handleEnable2StepVerification=()=>{
    console.log("2 step verification")
  }
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex lg:space-x-10 space-y-7 lg:space-y-0">
              <div className="flex flex-col space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email:</p>
                  <p className="text-gray-500">{auth.user?.email}</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Full Name:</p>
                  <p className="text-gray-500">{auth.user?.fullName}</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Date Of Birth:</p>
                  <p className="text-gray-500">5/06/07</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Nationality:</p>
                  <p className="text-gray-500">Indian</p>
                </div>
              </div>


              

              {/* You can add more sections or fields here if needed */}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {true? <Badge className={"space-x-2 text-white bg-green-600"}>
                  <VerifiedIcon/>
                  <span>
                  Enabled
                  </span>
                  </Badge>:
                <Badge className="bg-orange-500">
                  Diasabled
                </Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div>
              <Dialog>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Verify Your Account</DialogTitle>
      
    </DialogHeader>
    <AccountVerificationForm handleSubmit={handleEnable2StepVerification}/>
  </DialogContent>
</Dialog>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
