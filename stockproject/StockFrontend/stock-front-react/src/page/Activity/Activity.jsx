import { Table } from "@/components/ui/table";
import { TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersForUser } from "@/State/Order/Action";

const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(store => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(getAllOrdersForUser({ jwt }));
  }, [dispatch]);

  return (
    <div className="p-3 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl lg:text-5xl">Activity</h1>
      </div>
      <Table className="w-full table-auto border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/12 py-5 text-left">Date & Time</TableHead>
            <TableHead className="w-1/12 py-5 text-left">Order Type</TableHead>
            <TableHead className="w-1/12 text-left">Current Price</TableHead>
            <TableHead className="w-1/12 text-left">Price Change</TableHead>
            <TableHead className="w-1/12 text-left">Change (%)</TableHead>
            <TableHead className="w-1/12 text-left">High Price</TableHead>
            <TableHead className="w-1/12 text-left">Low Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orders.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-2/12 text-left">
                {/* Format and display the timestamp */}
                <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                <p className="text-gray-400">{new Date(item.timestamp).toLocaleTimeString()}</p>
              </TableCell>
              <TableCell className="w-1/12 text-left">{item.ordertype}</TableCell>
              <TableCell className="w-1/12 text-left">{item.orderitem.stock.c}</TableCell>
              <TableCell className="w-1/12 text-left">{item.orderitem.stock.d}</TableCell>
              <TableCell className="w-1/12 text-left">{item.orderitem.stock.dp}%</TableCell>
              <TableCell className="w-1/12 text-left">{item.orderitem.stock.h}</TableCell>
              <TableCell className="w-1/12 text-left">{item.orderitem.stock.l}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
