import React from "react";

const Cancel = () => {
  return (
    <div className="container"><br/><br/>
      <button className="btn btn-danger" onClick={() => {
        window.history.back();
      }}>Cancel</button>
    </div>
  )
}

export default Cancel