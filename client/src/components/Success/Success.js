import React from "react";

const Succsess = ({message}) => {
  return (
    <div className="alert alert-success" role="alert">
      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span className="msg">{message}</span>
    </div>
  )
}

export default Succsess;