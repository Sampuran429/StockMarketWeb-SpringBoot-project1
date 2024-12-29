import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAssets } from "@/State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { userAssets, loading, error } = useSelector((store) => store.asset);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getUserAssets(token));
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading assets: {error}</div>;
  }

  return (
    <div className="p-3 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl lg:text-5xl">Portfolio</h1>
      </div>
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5 text-left">Asset</TableHead>
            <TableHead className="w-1/5 text-left">Quantity</TableHead>
            <TableHead className="w-1/5 text-left">Current-Price</TableHead>
            <TableHead className="w-1/5 text-left">High-Price</TableHead>
            <TableHead className="w-1/5 text-left">Low-Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userAssets.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-1/5 text-left">{item.stock.symbol.toUpperCase()}</TableCell>
              <TableCell className="w-1/5 text-left">{item.quantity}</TableCell>
              <TableCell className="w-1/5 text-left">{item.stock.c}</TableCell>
              <TableCell className="w-1/5 text-left">{item.stock.h}</TableCell>
              <TableCell className="w-1/5 text-left">{item.stock.l}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
