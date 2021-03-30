import React, { useEffect } from 'react';
import Web3 from 'web3';
import { myMessageABI } from './ABI/myMessageABI';

//Components
import Header from './components/Headers';
import Form from './components/Form';

//Provider
import MessageProvider from './context/MessageProvider';


const App = () => {

  const checkWeb3Provider = async() => {
      let web3 = new Web3(Web3.givenProvider);

      if (window.ethereum) {
        // use MetaMask's provider
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({method: 'eth_requestAccounts'}); // get permission to access accounts
        const contractAddress = '0xf6e09b77560702d07472889472ab972735e699f6';
        const myMessageContract = new web3.eth.Contract(myMessageABI, contractAddress);
        var account = '';
        window.ethereum.on('accountsChanged', function (accounts) {
          console.log('accountsChanges',accounts[0]);
    
        });
      } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
      }
  }

 useEffect(()  => {
    checkWeb3Provider()
  }, [])

  return (
    <div className='main-container'>
      <MessageProvider>
        <Header />
        <Form/>
      </MessageProvider>
    </div>
  )
}

export default App
