import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Withdrawal = () => {
  const dispatch = useDispatch()
  const { wallet,withdrawal} = useSelector(store => store)

  useEffect(()=>{
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  },[])
  return (
    <div className="p-3 lg:p-10">
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-4xl lg:text-5xl">Withdrawal</h1>
    </div>
    <Table className="w-full table-auto border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/12 py-5 text-left">Date</TableHead>
          <TableHead className="w-2/12 py-5 text-left">Method</TableHead>
          <TableHead className="w-1/12 text-left">Amount</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {withdrawal.history.map((item, index) => (
          <TableRow key={index}>
             <TableCell className="w-1/12 text-left">
             <p>{item.date.toString()}</p>
             </TableCell>
            <TableCell className="w-2/12 text-left">Bank</TableCell>
            <TableCell className="w-2/12 text-left">{item.amount}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}

export default Withdrawal