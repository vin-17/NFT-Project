import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotConnected from './components/NotConnected.js';

function App() {
  return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Marketplace />}/>
            <Route path="/sellNFT" element={<SellNFT />}/> 
            <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
            <Route path="/profile" element={<Profile />}/> 
            <Route path="/NotConnected" element={<NotConnected />}/> 
          </Routes> 
        </BrowserRouter> 
    
  );
}

export default App;
