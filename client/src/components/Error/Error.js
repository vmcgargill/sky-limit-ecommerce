import React from "react";

const Error = ({message}) => {
  return (
    <div class="alert alert-danger" role="alert">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span class="sr-only">Error:</span> <span class="msg">{message}</span>
    </div>
  )
}

export default Error;