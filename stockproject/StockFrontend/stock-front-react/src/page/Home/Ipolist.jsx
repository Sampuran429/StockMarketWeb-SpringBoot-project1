import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// DatePicker component for "From" and "To" dates
// eslint-disable-next-line react/prop-types
const DatePicker = ({ date, setDate, label }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-[180px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>{label}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

const Ipolist = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [ipoData, setIpoData] = useState([]);

  const handleSearch = () => {
    if (fromDate && toDate) {
      const formattedFromDate = format(fromDate, "yyyy-MM-dd");
      const formattedToDate = format(toDate, "yyyy-MM-dd");

      fetch(`http://localhost:8081/ipolist?from=${formattedFromDate}&to=${formattedToDate}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          setIpoData(data); // Update the state with fetched IPO data
        })
        .catch((error) => {
          console.error("Error fetching IPO list:", error);
        });
    } else {
      alert("Please select both From and To dates.");
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <DatePicker date={fromDate} setDate={setFromDate} label="From" />
        <DatePicker date={toDate} setDate={setToDate} label="To" />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="flex flex-wrap -mx-1">
        {ipoData.length > 0 ? (
          ipoData.map((ipo, index) => (
            <div key={index} className="w-full md:w-1/3 px-2 mb-2">
              <Card className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-2">
                <CardHeader className="p-2">
                  <CardTitle className="text-sm font-semibold truncate">
                    Name: {ipo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-xs truncate">Date: {ipo.date}</p>
                  <p className="mt-2 text-xs text-pink-200">
                    <ul>Exchange: {ipo.exchange}</ul>
                    <ul>Number of Shares: {ipo.numberOfShares}M</ul>
                    <ul>Price: ${ipo.price}</ul>
                    <ul>Status: {ipo.status}</ul>
                    <ul>Symbol: {ipo.symbol}</ul>
                    <ul>Total Shares Value: ${ipo.totalSharesValue}M</ul>
                  </p>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500">No IPO data available.</div>
        )}
      </div>
    </div>
  );
};

export default Ipolist;
