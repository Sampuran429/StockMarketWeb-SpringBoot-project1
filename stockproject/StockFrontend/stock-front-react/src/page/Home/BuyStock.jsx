import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PayOrder } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetDetails } from "@/State/Asset/Action";
import { addItemtoWatchlist } from "@/State/Watchlist/Action"; // Import the action

const BuyStock = ({ symbol }) => {
  const { stock, loading, error } = useSelector((state) => state.stock);
  const { wallet } = useSelector((state) => state.wallet);
  const { asset } = useSelector((state) => state.asset); // Access the user's asset holdings
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (symbol) {
      dispatch(getUserWallet(jwt)); // Fetch wallet
      dispatch(getAssetDetails({ stockId: symbol, jwt })); // Fetch asset details using the stock symbol as the stock ID
    }
  }, [dispatch, symbol]);

  const [orderType, setOrderType] = useState("Buy");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [insufficientStock, setInsufficientStock] = useState(false);

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
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {stock && stock.symbol === symbol && (
        <div className="mt-2 text-sm">
          <p>Current Price: ${stock.c}</p>
          <p>Price Change: ${stock.d}</p>
          <p>Percentage Change: {stock.dp}%</p>
          <p>High: ${stock.h}</p>
          <p>Low: ${stock.l}</p>
          <p>Open: ${stock.o}</p>
          <p>Previous Close: ${stock.pc}</p>

          {/* Display the quantity bought by the user */}
          {asset && <p className="mt-1">Your Holdings: {asset.quantity} shares</p>}

          <Textarea
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />

          <p>Total Amount: ${amount}</p>

          {wallet && <p>Wallet Balance: ${wallet.balance}</p>}

          {insufficientBalance && (
            <p style={{ color: "red" }}>Insufficient balance to buy the stock.</p>
          )}
          {insufficientStock && (
            <p style={{ color: "red" }}>Insufficient stock to sell.</p>
          )}

          <Button
            variant="link"
            className="rounded-full mt-2"
            onClick={handleSubmitOrder}
            disabled={insufficientBalance || insufficientStock}
          >
            {orderType === "Buy" ? "Buy" : "Sell"}
          </Button>

          <Button
            className="rounded-full"
            onClick={() => setOrderType(orderType === "Buy" ? "Sell" : "Buy")}
          >
            {orderType === "Buy" ? "Switch to Sell" : "Switch to Buy"}
          </Button>

          {/* Add to Watchlist Button */}
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

export default BuyStock;
