import React, { useContext, useEffect } from 'react'
import { ConnectedContext } from '../context/ConnectedContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';

const NotConnected = () => {
    const Navigate = useNavigate();
    const { connected, toggleConnect } = useContext(ConnectedContext);
    useEffect(() => {
        if(connected){
          Navigate("/Marketplace")
        } 
      
      },[connected])
  return (
    <div>
        <Navbar />
        <h1 className="md:text-xl font-bold text-white">user not connected</h1>

    </div>
  )
}

export default NotConnected
