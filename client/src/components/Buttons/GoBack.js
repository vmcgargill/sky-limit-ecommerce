import React from "react";

const GoBack = () => {
  return (
    <div className="container"><br/><br/>
      <button className="btn btn-primary" onClick={() => {
        window.history.back();
      }}>Go Back</button><br/><br/>
    </div>
  )
}

export default GoBack