import React from 'react';

//Components
import Header from './components/Headers';
import Form from './components/Form';

//Provider
import MessageProvider from './context/MessageProvider';
import Web3Provider from './context/Web3Provider';


const App = () => {

  return (
    <div className='main-container'>
      <Web3Provider>
        <MessageProvider>
          <Header />
          <Form/>
        </MessageProvider>
      </Web3Provider>
    </div>
  )
}

export default App
