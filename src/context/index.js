import React, { useContext, createContext, useState } from 'react';
import { ethers } from 'ethers';
// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
// import Ethereum from './Ethereum.png'
// import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum)


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            })
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    }

    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        setIsConnected(true);
        const balance = await newAccount.getBalance()
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address)
    }

    const getuserBalance = async (address) => {
        const balance = await provider.getBalance(address, "latest")
    }

    // const isConnected = 
  
    // const publishCampaign = async (form) => {
    //   // wrapped up in try and catch 
    //   try {
    //     const data = await createCampaign({
    //               args: [
    //                   address, // owner
    //                   form.title, // title
    //                   form.description, // description
    //                   form.target,
    //                   new Date(form.deadline).getTime(), // deadline,
    //                   form.image,
    //               ],
    //           });
  
    //     console.log("contract call success", data)
    //   } catch (error) {
    //     console.log("contract call failure", error)
    //   }
    // }
    
  
     
    
   
  
      
    
  
   
    return (
      <StateContext.Provider
        value={{ 
        //   address,
        //   contract,
        //   connect,
        //   createCampaign: publishCampaign, 
        //   getCampaigns,
        //   getUserCampaigns,
        //   donate,
        //   getDonations
            isConnected,
            connectwalletHandler,
            accountChangedHandler

        }}
      >
        {children}
      </StateContext.Provider>
    )
  }
  
  export const useStateContext = () => useContext(StateContext);