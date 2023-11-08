// import logo from '../logo_3.png';
import fullLogo from '../images/full_logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { ConnectedContext } from '../context/ConnectedContext';

function Navbar() {

// const [connected, toggleConnect] = useState(Con);
const { connected, toggleConnect } = useContext(ConnectedContext);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  try {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // window.ethereum.enable()
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  } catch (error) {
    console.log(error)
  }

}

function updateButton() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "aaaaaaaaaaa";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-green-70");
  ethereumButton.classList.add("bg-green-500");
}

async function connectWebsite() {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0xaa36a7')
      {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
       })
      }  
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          toggleConnect();
          updateButton();
          console.log("here");
          getAddress();
          window.location.replace(location.pathname)
        });
        // if (accounts.length === 0) {
        //   throw new Error('No Ethereum accounts found. Please connect your wallet.');
        // }
    
        // updateButton();
        // console.log("here");
        // getAddress();
        // window.location.replace(location.pathname);
    
      
    } catch (error) {
      if (error.message === "MetaMask - RPC Error: User rejected the request.") {
        // User rejected the request, handle it gracefully, e.g., show a message to the user.
        console.error('User rejected the request.');
      } else {
        // Handle other errors, log them, or display an error message.
        console.error('Error while connecting:', error);
      }
      
    }

}

  useEffect(() => {
    if(window.ethereum === undefined){
      console.log('MetaMask is not installed or enabled. Please install or enable MetaMask.');
    }
      
    let val = window.ethereum.isConnected();
    if(!val){
      console.log("disconnected  ... ");
    }
    if(val)
    {
      console.log("here");
      getAddress();
      // toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  },[currAddress]);

    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2"/>
            <div className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{currAddress !== "0x" ? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;