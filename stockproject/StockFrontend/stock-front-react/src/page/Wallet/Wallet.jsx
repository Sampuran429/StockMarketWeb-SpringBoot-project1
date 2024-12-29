import { CopyIcon, DollarSign, WalletIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { ReloadIcon, ShuffleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { depositmoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector(store => store);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(depositmoney({
        jwt: localStorage.getItem("jwt"),
        orderId: orderId,
        paymentId: razorpayPaymentId || paymentId,
        navigate
      }));
    }
  }, [orderId, paymentId, razorpayPaymentId]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <WalletIcon size={30} />
                <div className="ml-4 flex flex-col">
                  <CardTitle className="text-2xl text-left">My Wallet</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-200 text-sm text-left">
                      #{wallet.userwallet.id}
                    </p>
                    <CopyIcon size={12} className="cursor-pointer hover:text-slate-3000" />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon onClick={handleFetchUserWallet} className="w-6 h-6 cursor-pointer hover:text-grey-400" />
              </div>
            </div>
          </CardHeader>

          {/* Wallet Balance Section */}
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <DollarSign />
              <span className="text-2xl font-semibold ml-2">
                {wallet.userwallet.balance || 0} {/* Default to 0 if undefined */}
              </span>
            </div>

            {/* Add Money, Withdrawal, Transfer Cards */}
            <div className="flex gap-7 mt-5 justify-center">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UpdateIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UpdateIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center tex-xl">
                      Transfer to Other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10 ">
         

          <div className="space-y-5 ">
            {wallet.transactions.map((item, i) => (
              <div key={i}>
                <Card className="px-5 flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <Avatar onClick={handleFetchWalletTransaction}>
                      <AvatarFallback>
                        <ShuffleIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h1>{item.purpose}</h1>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  <div>
                    <p className={'text-green-500'}>{item.amount || 0}</p> {/* Default to 0 if undefined */}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
