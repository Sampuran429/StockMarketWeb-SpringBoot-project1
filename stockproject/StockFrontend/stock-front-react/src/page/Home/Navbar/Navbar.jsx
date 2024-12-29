import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DragHandleHorizontalIcon} from "@radix-ui/react-icons"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux"


const Navbar = () => {
  const {auth}=useSelector(store=>store)
  return (
    <div className="px-4 py-4 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
              <DragHandleHorizontalIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-r-0 flex flex-col justify-start">
            <SheetHeader>
              <SheetTitle>
                <div className="text-2xl flex justify-center items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg" />
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-700">HI</span>
                    <span>STOCK</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <p className="text-sm lg:text-base cursor-pointer">HISTOCK</p>
        <div className="p-0 ml-9">
            {/* <Button variant="outline" className="flex items-center gap-3">
                <MagnifyingGlassIcon/>
                <span>Search</span>
            </Button> */}
        </div>
      </div>
      <div className="">
        <Avatar>
            <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar;
