import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketStatus } from '@/State/MarketStatus/Action';
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

const MarketStatus = () => {
  const dispatch = useDispatch();

  // Correcting the useSelector to match the key in rootReducer
const { loading, marketStatus, error } = useSelector((state) => state.marketstatus);


  useEffect(() => {
    // Dispatch the action to fetch market status when the component mounts
    dispatch(fetchMarketStatus());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Optional: you can style a loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if there is one
  }

  return (
    <div className="flex flex-wrap -mx-1">
      <div className="w-full h-full md:w-full px-2 mb-3">
        <Card className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-2">
          <CardHeader className="p-2">
            <CardTitle className="text-sm font-semibold truncate">
              Open: {marketStatus.isOpen ? 'Yes' : 'No'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <p className="text-xl truncate">Holiday: {marketStatus.holiday || 'N/A'}</p>
            <p className="mt-2 text-xl text-pink-200">
              <ul>
                <li>Session: {marketStatus.session || 'N/A'}</li>
                <li>TimeZone: {marketStatus.timezone || 'N/A'}</li>
                <li>Exchange: {marketStatus.exchange || 'N/A'}</li>
              </ul>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketStatus;
