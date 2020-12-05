import React from "react";

const BillingDetailsForm = ({CancelButton}) => {
  return (
    <div>
      <label htmlFor="name">Full Name (First and Last)</label>
      <input id="name" placeholder="Enter Full Name" type="text" className="form-control" maxLength="50"></input>
      <label htmlFor="address">Street Address</label>
      <input id="address1" placeholder="Address 1" type="text" className="form-control" maxLength="50"></input><br/>
      <input id="address2" placeholder="Address 2" type="text" className="form-control" maxLength="50"></input>
      <label htmlFor="city">City</label>
      <input id="city" placeholder="Enter City" type="text" className="form-control" maxLength="50"></input>
      <label htmlFor="state">State / Province / Region</label>
      <input id="state" placeholder="Enter State" type="text" className="form-control" maxLength="50"></input>
      <label htmlFor="zip">Zip code</label>
      <input id="zip" placeholder="Enter Zip" type="text" className="form-control" maxLength="50"></input><br/><br/>
      {CancelButton}
    </div>
  )
}

export default BillingDetailsForm;