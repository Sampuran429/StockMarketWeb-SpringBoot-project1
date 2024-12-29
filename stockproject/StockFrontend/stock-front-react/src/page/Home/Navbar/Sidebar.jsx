import { DashboardIcon, ExitIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { ActivityIcon, BookMarkedIcon, LandmarkIcon, WalletIcon, CreditCardIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/State/Auth/Action";

const Sidebar = () => {
    const navigate = useNavigate();

    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch(logout())
    }

    const menu = [
        { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
        { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-5 w-5" /> },
        { name: "WatchList", path: "/watchlist", icon: <BookMarkedIcon className="h-5 w-5" /> },
        { name: "Activity", path: "/activity", icon: <ActivityIcon className="h-5 w-5" /> },
        { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-5 w-5" /> },
        { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-5 w-5" /> },
        { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-5 w-5" /> },
        { name: "Profile", path: "/profile", icon: <PersonIcon className="h-5 w-5" /> },
        { name: "Logout", path: "/", icon: <ExitIcon className="h-5 w-5" /> }
    ];

    return (
        <div className="mt-5 space-y-4">
            {menu.map((item) => (
                <div key={item.name}>
                    <SheetClose className="w-full">
                        <Button 
                            onClick={() => {
                                navigate(item.path)
                                if(item.name=="Logout"){
                                    handleLogout()
                                }
                            }} 
                            variant="outline" 
                            className="flex items-center gap-4 py-4 w-full"
                        >
                            <span className="w-6">{item.icon}</span>
                            <p className="text-sm">{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
