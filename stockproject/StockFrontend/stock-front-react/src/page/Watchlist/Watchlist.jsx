import { Table } from "@/components/ui/table";
import { TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserWatchlist, deleteItemFromWatchlist } from "@/State/Watchlist/Action";

const Watchlist = () => {
  const { watchlist } = useSelector(store => store);
  const dispatch = useDispatch();
  const [localWatchlist, setLocalWatchlist] = useState([]); // Local state for watchlist

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(getUserWatchlist(jwt)); // Fetch the user's watchlist
  }, [dispatch]);

  useEffect(() => {
    // Synchronize the local watchlist with the Redux state
    setLocalWatchlist(watchlist.items);
  }, [watchlist]);

  // Handle removing a stock from both backend and local watchlist
  const handleRemoveFromWatchlist = (symbol) => {
    const jwt = localStorage.getItem("jwt");

    // Dispatch the action to remove the stock from the backend
    dispatch(deleteItemFromWatchlist({ stockId: symbol, jwt }))
      .then(() => {
        // If successful, remove the stock from the local state
        const updatedWatchlist = localWatchlist.filter(item => item.symbol !== symbol);
        setLocalWatchlist(updatedWatchlist); // Update local state to remove the item
      })
      .catch((error) => {
        console.log("Failed to remove stock from watchlist", error);
      });
  };

  return (
    <div className="p-3 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl lg:text-5xl">Watchlist</h1>
      </div>
      <Table className="w-full table-auto border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12 text-left">Symbol</TableHead>
            <TableHead className="w-2/12 text-left">Current-Price</TableHead>
            <TableHead className="w-3/12 text-left">High-Price</TableHead>
            <TableHead className="w-2/12 text-left">Low-Price</TableHead>
            <TableHead className="w-2/12 text-left">Price-Change</TableHead>
            <TableHead className="w-1/12 text-left text-red-50">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localWatchlist.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-1/12 text-left">{item.symbol}</TableCell>
              <TableCell className="w-2/12 text-left">{item.c}</TableCell>
              <TableCell className="w-3/12 text-left">{item.h}</TableCell>
              <TableCell className="w-2/12 text-left">{item.l}</TableCell>
              <TableCell className="w-2/12 text-left">${item.pc}</TableCell>
              <TableCell className="w-1/12 text-left">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFromWatchlist(item.symbol)} // Pass the symbol to remove
                  className="h-10 w-10"
                >
                  <BookmarkFilledIcon className="w-6 h-6 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
