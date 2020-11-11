import React from "react";

const Error = ({message}) => {
  return (
    <div className="alert alert-danger" role="alert">
      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span className="sr-only">Error:</span> <span className="msg">{message}</span>
    </div>
  )
}

export default Error;