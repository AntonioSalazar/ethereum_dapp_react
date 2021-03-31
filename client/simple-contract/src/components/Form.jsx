import React, { useState, useContext } from "react";

import { Web3Context } from "../context/Web3Provider";

const Form = () => {
  const [formMessage, setFormMessage] = useState("");

  const { currentAccount, contract } = useContext(Web3Context);
  console.log(contract, "from form");

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
      <p>You are currently connected with the {currentAccount} account</p>
      <h2>Formulario para setMessage</h2>
      <form onSubmit={guardarDatos}>
        <input
          type="text"
          placeholder="Set Message"
          className="form-control mb-2"
          onChange={(e) => setFormMessage(e.target.value)}
          value={formMessage}
        />

        <button className="btn btn-primary btn-block" type="submit">
          Set Message
        </button>
      </form>
    </div>
  );
};

export default Form;
