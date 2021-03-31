import React, {createContext, useState} from 'react'
export const MessageContext = createContext();

const MessageProvider = props => {

    const [ message, setMessage ] = useState('');

    return (
        <MessageContext.Provider
            value={{
                message,
                setMessage
            }}
        >
            {
                props.children
            }
        </MessageContext.Provider>
    )
}

export default MessageProvider
