import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import MarketNews from "./MarketNews";
import Ipolist from "./Ipolist";
import StockList from "./StockList";
import MarketStatus from "./MarketStatus";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Textarea } from "@/components/ui/textarea";
import StockAI from "./StockAI"; 
import SearchStock from "./SearchStock";
const Home = () => {
  const [activeComponent, setActiveComponent] = useState("MarketNews");
  const [showStockAI, setShowStockAI] = useState(false);
  const [symbol, setSymbol] = useState(""); // State for stock symbol
  const [stockRecommendationData, setStockRecommendationData] = useState([]); // State for stock recommendations

  const handleCategory = (value) => {
    setActiveComponent(value);
  };

  const toggleStockAI = () => {
    setShowStockAI((prev) => !prev);
  };

  const fetchStockRecommendations = async (symbol) => {
    if (!symbol) return; // Prevent fetching if symbol is empty
    try {
      const response = await fetch(`http://localhost:8081/recommended?symbol=${symbol}`); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setStockRecommendationData(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching stock recommendations:", error);
    }
  };

  useEffect(() => {
    fetchStockRecommendations(symbol); // Fetch recommendations whenever the symbol changes
  }, [symbol]);

  // Render the active component based on the state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "MarketNews":
        return <MarketNews />;
      case "Ipolist":
        return <Ipolist />;
      case "StockList":
        return <StockList />;
      case "SearchStock":
        return <SearchStock />;
      case "MarketStatus":
        return <MarketStatus />;
      default:
        return <MarketNews />;
    }
  };

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[65%] border-r">
          <div className="p-3 flex items-center gap-4">
            <Button
              onClick={() => handleCategory("MarketNews")}
              variant={activeComponent === "MarketNews" ? "default" : "outline"}
              className="rounded-full"
            >
              Market-News
            </Button>

            <Button
              onClick={() => handleCategory("Ipolist")}
              variant={activeComponent === "Ipolist" ? "default" : "outline"}
              className="rounded-full"
            >
              IPO-LIST
            </Button>

            <Button
              onClick={() => handleCategory("StockList")}
              variant={activeComponent === "StockList" ? "default" : "outline"}
              className="rounded-full"
            >
              Stock-List
            </Button>
            <Button
              onClick={() => handleCategory("SearchStock")}
              variant={activeComponent === "SearchStock" ? "default" : "outline"}
              className="rounded-full"
            >
              SearchStock
            </Button>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  Market-Status
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="p-4">
                <MarketStatus />
              </HoverCardContent>
            </HoverCard>
          </div>

          {renderActiveComponent()}
        </div>

        <div className="lg:w-[45%]">
          <div className="text-area flex items-center  mt-4">
            <Textarea
              className="mt-0 w-3/4" // Shrink the width of the Textarea
              placeholder="Write SYMBOL of the Stock..."
              value={symbol} // Bind the value to state
              onChange={(e) => setSymbol(e.target.value)} // Update state on change
            />
            {/* <Button onClick={() => fetchStockRecommendations(symbol)}>Submit</Button> Call fetch function on click */}
          </div>

          <ResponsiveContainer width="100%" className="mt-8" height={400}>
            <BarChart data={stockRecommendationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="buy" fill="#82ca9d" name="Buy" />
              <Bar dataKey="hold" fill="#8884d8" name="Hold" />
              <Bar dataKey="sell" fill="#ff7300" name="Sell" />
              <Bar dataKey="strongBuy" fill="#413ea0" name="Strong Buy" />
              <Bar dataKey="strongSell" fill="#d00000" name="Strong Sell" />
            </BarChart>
          </ResponsiveContainer>

          <p className="mt-2 text-center text-lg font-semibold">Stock Symbol: {symbol}</p>

          <hr className="border-t-2 border-gray-300 my-4" />

          <div>
            <Button
              onClick={toggleStockAI}
              variant={showStockAI ? "default" : "outline"}
              className="rounded-full"
            >
              Ask StockAI
            </Button>
          </div>

          {showStockAI && (
            <div className="mt-4">
              <StockAI />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
