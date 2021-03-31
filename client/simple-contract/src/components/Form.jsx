import React, { useState, useContext } from "react";
import { useAlert } from "react-alert";

import { Web3Context } from "../context/Web3Provider";

const Form = () => {
  const [formMessage, setFormMessage] = useState("");

  const { currentAccount, currentNetworkID } = useContext(Web3Context);

  const alert = useAlert();

  if (currentNetworkID == 4) {
    alert.success("Great! You are connected to the Rinkeby Test Network");
  } else {
    alert.error(
      "This application will only work in the Rinkeby Test Network, please change the network to the Rinkeby Test Network"
    );
  }
  const guardarDatos = (e) => {
    e.preventDefault();

    if (!formMessage.trim()) {
      console.log("Esta vacio el mensaje");
      return;
    }

    e.target.reset();
    setFormMessage("");
  };

  return (
    <div className="form-div">
      <h2>Formulario para setMessage</h2>
      <form onSubmit={guardarDatos}>
        <input
          type="text"
          placeholder="Set Message"
          className="form-control mb-2"
          onChange={(e) => setFormMessage(e.target.value)}
        />
        <h2>You are currently connected with the {currentAccount} account</h2>

        <button className="btn btn-primary btn-block" type="submit">
          Set Message
        </button>
      </form>
    </div>
  );
};

export default Form;
