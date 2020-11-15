import React, { useEffect, useState } from "react";
import API from "../../../utils/API";

const UpdateAddress = () => {
  const [addAddressForm, setAddressForm] = useState("");
  const [addAddressBtn, setAddressBtn] = useState("")
  const [addresses, setAddresses] = useState(<tr><td></td><td></td><td></td><td></td></tr>);
  
  useEffect(() => {
    const removeAddress = (id) => {
      setAddressBtn("")
      setAddressForm(
        <div>
          <h5>Are you sure?</h5>
          <button className="btn btn-success" onClick={() => {
            API.removeAddress(id).then(() => {
              setAddressForm("")
              setAddressBtn(AddAddressButton)
              LoadAddresses();
            })
          }}>Yes</button><br/><br/>
          {CancelButton}
        </div>
      )
    }

    const addAddress = () => {
      setAddressBtn(<button className="btn btn-success" onClick={creatAddress}>Create</button>)
      setAddressForm(AddressForm)
    }

    const AddAddressButton = (<button onClick={addAddress} className="btn btn-primary">Add Address</button>)
    
    const CancelButton = (
      <button className="btn btn-danger" onClick={() => {
        setAddressForm("")
        setAddressBtn(AddAddressButton)
      }}>Cancel</button>
    )

    const creatAddress = () => {
      const data = {
        country: document.getElementById("country").value,
        name: document.getElementById("name").value,
        addressLine1: document.getElementById("address1").value,
        addressLine2: document.getElementById("address2").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        default: false
      }
      API.createAddress(data).then(res => {
        if (res.data === 401) {
          window.location.href = "/login/updateAddress"
        } else {
          setAddressForm("")
          setAddressBtn(AddAddressButton)
          LoadAddresses()
        }
      })
    }

    const AddressForm = (
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" placeholder="Enter Country" type="text" className="form-control" maxLength="50"></input>
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

    const LoadAddresses = () => {
      API.getUserAddresses().then(res => {
        if (res.data === 401) {
          window.location.href = "/login/updateAddress"
        } else if (res.data) {
          if (res.data.address.length === 0) {
            setAddresses(<tr><th colSpan="4">You currently have no addresses stored.</th></tr>)
          } else {
            setAddresses(res.data.address.map(address => {
              if (address.default) {
                address.default = "Yes"
              } else if (res.data.address.length > 0) {
                address.default = <button className="btn btn-success" onClick={() => {
                  API.setDefaultAddress(address._id).then(res => {
                    if (res.data === 401) {
                      window.location.href = "/login/updateAddress"
                    } else {
                      LoadAddresses();
                    }
                  })
                }}>Set as Default</button>
              }
              return (
                <tr key={address._id}>
                  <th scope="row">
                    {address.country}<br/>
                    {address.name}<br/>
                    {address.addressLine1}<br/>
                    {address.addressLine2}
                    {address.city}, {address.state} {address.zip}
                  </th>
                  <td>{address.default}</td>
                  <td><button className="btn btn-primary" onClick={async () => {
                    await setAddressBtn(<button className="btn btn-success" onClick={() => {
                      const updateData = {
                        "address.$.country": document.getElementById("country").value,
                        "address.$.name": document.getElementById("name").value,
                        "address.$.addressLine1": document.getElementById("address1").value,
                        "address.$.addressLine2": document.getElementById("address2").value,
                        "address.$.city": document.getElementById("city").value,
                        "address.$.state": document.getElementById("state").value,
                        "address.$.zip": document.getElementById("zip").value
                      }
                      API.updateAddress(address._id, updateData).then(res => {
                        if (res.data === 401) {
                          window.location.href = "/login/updateAddress"
                        } else {
                          setAddressBtn(AddAddressButton);
                          setAddressForm("");
                          LoadAddresses();
                        }
                      })
                    }}>Update Address</button>)
                    await setAddressForm(AddressForm)
                    document.getElementById("country").value = address.country
                    document.getElementById("name").value = address.name
                    document.getElementById("address1").value = address.addressLine1
                    document.getElementById("address2").value = address.addressLine2
                    document.getElementById("city").value = address.city
                    document.getElementById("state").value = address.state
                    document.getElementById("zip").value = address.zip            
                  }}>Update</button></td>
                  <td><button className="btn btn-danger" onClick={() => {
                    removeAddress(address._id)
                  }}>Remove</button></td>
                </tr>
              )
            }))
          }
        }
      })
    }

    setAddressBtn(AddAddressButton)
    LoadAddresses();
  }, [])

  return (
    <div>
      <h2>Update Addresses</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body">
              {addAddressForm}<br/>
              {addAddressBtn}
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Address</th>
                    <th scope="col">Default Address</th>
                    <th scope="col">Update Address</th>
                    <th scope="col">Remove Address</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdateAddress;