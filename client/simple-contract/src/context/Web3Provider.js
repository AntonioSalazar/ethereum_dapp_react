import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { myMessageABI } from '../ABI/myMessageABI';
import { useAlert } from "react-alert";


export const Web3Context = createContext();

const Web3Provider = props => {

    const [currentAccount, setCurrentAccount ] = useState('');
    const [currentNetworkID, setCurrentNetworkID] = useState(0);
    const [ messageContract, setMessageContract] = useState({});
    const alert = useAlert();

    const checkWeb3Provider = async () => {
        if (window.ethereum) {
            // let web3 = new Web3(window.ethereum);
            let web3 = new Web3(Web3.givenProvider)
    
            await window.ethereum.request({method: 'eth_requestAccounts'}); // get permission to access accounts
            const contractAddress = '0xf6e09b77560702d07472889472ab972735e699f6'; //Deployed to the rinkeby test network
            const myMessageContract = new web3.eth.Contract(myMessageABI, contractAddress);
            setMessageContract(myMessageContract)
            console.log(myMessageContract.events.MessageSent((err, res) => console.log(res)));
            
            //Set to the currentAccount state whatever account the user is using at the moment he loads the page
            const accounts = await web3.eth.getAccounts();
            setCurrentAccount(accounts[0]);
            //Set to networkdId the ID of the network the user has in use in Metamask
            let currentNetworkID = await web3.eth.net.getId();
            setCurrentNetworkID(currentNetworkID)

            //Detect metamask account change
            window.ethereum.on('accountsChanged', function (accounts) {
              //console.log('accountsChanges',accounts[0]);
              setCurrentAccount(accounts[0])
            });
            //Detect metamask network ID change
            window.ethereum.on('networkChanged', function(networkId){
              // console.log('networkChanged',networkId);
              setCurrentNetworkID(parseInt(networkId));
            });
          } else {
            console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            // eslint-disable-next-line
            let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
          }
    }

    const showAlert = () => {
      if (currentNetworkID === 0) {
        alert.info('Loading...')
      }
      else if (currentNetworkID === 4 ) {
        alert.success("Great! You are connected to the Rinkeby Test Network");
      } else {
        alert.error(
          "This application will only work in the Rinkeby Test Network, please change the network to the Rinkeby Test Network"
        );
      }
    }

    useEffect(() => {
        checkWeb3Provider()
    }, [])

    useEffect(() => {
      showAlert()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentNetworkID])

    return (
        <Web3Context.Provider
            value={{
                currentAccount,
                messageContract
            }}
        >
        {props.children}    
        </Web3Context.Provider>
    )
}

export default Web3Provider
