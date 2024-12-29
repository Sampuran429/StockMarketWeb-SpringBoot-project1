import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockList } from "@/State/StockList/Action";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button for Buy link
import BuyStock from "./BuyStock"; // Import BuyStock component
import { fetchStockDetails } from "@/State/Stock/Action"; // Import the fetchStockDetails action
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"; // Import HoverCard

const StockList = () => {
  const dispatch = useDispatch();
  
  // Use useSelector to access stock list state
  const { stockList, loading, error } = useSelector((state) => state.stocklist);

  // Fetch stock list when the component mounts
  useEffect(() => {
    dispatch(fetchStockList());
  }, [dispatch]);

  const handleMouseEnter = (symbol) => {
    dispatch(fetchStockDetails(symbol)); // Dispatch action to fetch stock details for the hovered stock
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap -mx-1">
      {stockList.map((stock, index) => (
        <div key={stock.symbol || index} className="w-full md:w-1/3 px-2 mb-2">
          <Card className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-semibold truncate">
                Symbol: {stock.symbol || "Unknown"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs truncate">Type: {stock.type}</p>
              <p className="mt-2 text-xs text-pink-200">
                <ul>Description: {stock.description}</ul>
                <ul>Figi: {stock.figi}</ul>
                <ul>Mic: {stock.mic}</ul>
                <ul>Currency: {stock.currency}</ul>
              </p>

              {/* HoverCard with a trigger on the "Details" Button */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="text-blue-500 hover:underline"
                    onMouseEnter={() => handleMouseEnter(stock.symbol)}
                    disabled={loading}
                  >
                    Details
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="p-4  shadow-lg rounded-lg">
                  {/* Display the BuyStock component within the hover card */}
                  <BuyStock symbol={stock.symbol || "Unknown"} />
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default StockList;
