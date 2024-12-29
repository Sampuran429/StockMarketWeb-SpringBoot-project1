import './App.css';
import Home from './page/Home/Home';
import Navbar from './page/Home/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import Portfolio from './page/Portfolio/Portfolio';
import Activity from './page/Activity/Activity';
import Wallet from './page/Wallet/Wallet';
import Withdrawal from './page/WithDrawal/Withdrawal';
import PaymentDetails from './page/PaymentDetails/PaymentDetails';
import Watchlist from './page/Watchlist/Watchlist';
import Profile from './page/Profile/Profile';
import Auth from './page/Auth/Auth';
import StockList from './page/Home/StockList';
import MarketStatus from './page/Home/MarketStatus';
import Ipolist from './page/Home/Ipolist';
import BuyStock from './page/Home/BuyStock';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getuser } from './State/Auth/Action';

// import SearchCoin from './page/SearchCoin/SearchCoin';
// import NotFound from './page/NotFound.jsx/NotFound';
function App() {

  const {auth}=useSelector(store=>store);
  console.log("auth -----" ,auth)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getuser(auth.jwt ||localStorage.getItem("jwt")))
  },[auth.jwt])

  return (
    <>
    
    {auth.user ? <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/buy-stock" element={<BuyStock/>} />
       <Route path="/portfolio" element={<Portfolio/>} />
       <Route path="/stock-list" element={<StockList/>} />
       <Route path="/market-status" element={<MarketStatus/>} />
       <Route path="/ipo-list" element={<Ipolist/>} />
      <Route path="/activity" element={<Activity/>} />
      <Route path="/wallet" element={<Wallet/>} />
   
      <Route path="/withdrawal" element={<Withdrawal/>} />
      <Route path="/payment-details" element={<PaymentDetails/>} />
      <Route path="/watchlist" element={<Watchlist/>} />
      <Route path="/profile" element={<Profile/>} />
      {/* <Route path="/search" element={<SearchCoin/>} />  */}
      {/* <Route path="/*" element={<NotFound/>} /> */}
    </Routes>
    </div> : <Auth/>}
    </>
  );
}

export default App;
