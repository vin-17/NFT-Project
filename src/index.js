import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConnectedProvider } from './context/ConnectedContext';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <ConnectedProvider>
        <App />
      </ConnectedProvider>
);

































// reportWebVitals();
{/* <BrowserRouter>
<Routes>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/sellNFT" element={<SellNFT />}/> 
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
</Routes> 
</BrowserRouter> */}
