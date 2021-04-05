import React, { useState, useContext } from "react";

import { Web3Context } from "../context/Web3Provider";

const Form = () => {
  const [formMessage, setFormMessage] = useState("");
  const [getMessage, setGetMessage] = useState("");
  const [error, setError] = useState(false);
  const [txResult, setTxResult] = useState({});
  console.log(txResult, "tx result");

  const { currentAccount, messageContract } = useContext(Web3Context);

  const handleSet = async (e) => {
    e.preventDefault();

    if (!formMessage.trim()) {
      setError(true);
      return;
    }
    const gas = await messageContract.methods
      .setMessage(formMessage)
      .estimateGas();
    const result = await messageContract.methods
      .setMessage(formMessage)
      .send({ from: currentAccount, gas });
    e.target.reset();
    setError(false);
    setFormMessage("");
    setTxResult(result);
  };

  const handleGet = async (e) => {
    e.preventDefault();

    const result = await messageContract.methods.getMessage().call();
    setGetMessage(result);
  };

  return (
    <div className="form-div">
      <p>You are currently connected with the {currentAccount} account</p>
      <h2>Send a message to the Rinkeby test network!</h2>
      <form onSubmit={handleSet} className="form-set-message">
        <input
          type="text"
          placeholder="Set Message"
          className="form-control mb-2"
          onChange={(e) => setFormMessage(e.target.value)}
          value={formMessage}
        />
        {error ? <p className="error">You need to add a message!</p> : null}
        <button className="btn btn-primary btn-block" type="submit">
          Set Message
        </button>
      </form>
      <br />
      <h3>
        Click on the below button to see the message you sent to the Rinkeby
        testnet
      </h3>
      <button
        type="button"
        onClick={handleGet}
        className="btn btn-primary btn-block"
      >
        Get Message
      </button>
      <input
        type="text"
        className="get-message"
        placeholder={getMessage ? getMessage : "Your message will show here!"}
        disabled="disabled"
      />
      <br />
      {getMessage
        ? [
            <p>
              You can also track this transaction in
              <a
                href={`https://rinkeby.etherscan.io/tx/${txResult.transactionHash}`}
              >
                here
              </a>
            </p>,
          ]
        : null}
    </div>
  );
};

export default Form;
