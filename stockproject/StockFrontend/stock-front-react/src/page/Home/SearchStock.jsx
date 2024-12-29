import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchStockDetails } from "@/State/Stock/Action";
import { PayOrder } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetDetails } from "@/State/Asset/Action";
import { addItemtoWatchlist } from "@/State/Watchlist/Action";

const SearchStock = () => {
  const [symbol, setSymbol] = useState(""); // State to hold the stock symbol
  const [orderType, setOrderType] = useState("Buy");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [insufficientStock, setInsufficientStock] = useState(false);
  
  const dispatch = useDispatch();
  const { stock, loading, error } = useSelector((state) => state.stock);
  const { wallet } = useSelector((state) => state.wallet);
  const { asset } = useSelector((state) => state.asset);

  // Fetch stock details only when handleSearch is triggered
  const handleSearch = () => {
    const jwt = localStorage.getItem("jwt");
    if (symbol) {
      dispatch(fetchStockDetails(symbol)); // Fetch stock details by symbol
      dispatch(getUserWallet(jwt)); // Fetch wallet details
      dispatch(getAssetDetails({ stockId: symbol, jwt })); // Fetch asset details
    }
  };

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    if (stock && stock.c) {
      const totalAmount = stock.c * qty;
      setAmount(totalAmount);

      if (orderType === "Buy") {
        if (wallet && wallet.balance < totalAmount) {
          setInsufficientBalance(true);
        } else {
          setInsufficientBalance(false);
        }
      } else if (orderType === "Sell") {
        const holding = asset ? asset.quantity : 0;
        if (holding < qty) {
          setInsufficientStock(true);
        } else {
          setInsufficientStock(false);
        }
      }
    }
  };

  const handleSubmitOrder = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && stock && !insufficientBalance && !insufficientStock) {
      dispatch(
        PayOrder({
          jwt,
          amount,
          orderData: { stockId: symbol, quantity, orderType },
        })
      );
    }
  };

  const handleAddToWatchlist = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && symbol) {
      dispatch(addItemtoWatchlist({ stockId: symbol, jwt })); // Dispatch the action to add to watchlist
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-6 rounded-lg shadow-lg max-w-md mx-auto">
      <Input
        placeholder="Enter Stock Name..."
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)} // Update state on input change
        className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        onClick={handleSearch} // Trigger the search on button click
      >
        Search
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Display Stock Details */}
      {stock && stock.symbol === symbol && (
        <div className="mt-4 text-sm">
          <p>Current Price: ${stock.c}</p>
          <p>Price Change: ${stock.d}</p>
          <p>Percentage Change: {stock.dp}%</p>
          <p>High: ${stock.h}</p>
          <p>Low: ${stock.l}</p>
          <p>Open: ${stock.o}</p>
          <p>Previous Close: ${stock.pc}</p>

          {asset && <p>Your Holdings: {asset.quantity} shares</p>}

          {/* Buy/Sell Stock */}
          <Input
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="mt-2 w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <p>Total Amount: ${amount}</p>

          {wallet && <p>Wallet Balance: ${wallet.balance}</p>}

          {insufficientBalance && <p style={{ color: "red" }}>Insufficient balance to buy the stock.</p>}
          {insufficientStock && <p style={{ color: "red" }}>Insufficient stock to sell.</p>}

          <Button
            variant="link"
            className="rounded-full mt-2"
            onClick={handleSubmitOrder}
            disabled={insufficientBalance || insufficientStock}
          >
            {orderType === "Buy" ? "Buy" : "Sell"}
          </Button>

          <Button
            className="rounded-full mt-2"
            onClick={() => setOrderType(orderType === "Buy" ? "Sell" : "Buy")}
          >
            {orderType === "Buy" ? "Switch to Sell" : "Switch to Buy"}
          </Button>

          {/* Add to Watchlist */}
          <Button
            className="rounded-full mt-2"
            onClick={handleAddToWatchlist}
          >
            Add to Watchlist
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchStock;
