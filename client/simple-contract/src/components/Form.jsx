import React, { useState } from "react";

import { MessageContext } from "../context/MessageProvider";

const Form = () => {
  const [formMessage, setFormMessage] = useState("");

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
        <button className="btn btn-primary btn-block" type="submit">
          Set Message
        </button>
      </form>
    </div>
  );
};

export default Form;
