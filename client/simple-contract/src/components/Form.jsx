import React from "react";

const Form = () => {
  return (
    <div className="form-div">
      <h2>Formulario para setMessage</h2>
      <form>
        <input
          type="text"
          placeholder="Set Message"
          className="form-control mb-2"
        />
        <button className="btn btn-primary btn-block">Set Message</button>
      </form>
    </div>
  );
};

export default Form;
