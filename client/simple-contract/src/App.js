import React from 'react'
import Form from './components/Form';

//Components
import Header from './components/Headers';

//Provider
import MessageProvider from './context/MessageProvider';

const App = () => {
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
