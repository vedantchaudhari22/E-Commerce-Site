import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", address: "", city: "", state: "", country: "", pincode: "", phoneNumber: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);

    if (result?.success) {
      navigate('/checkout');
    }

    setFormData({
      fullName: "", address: "", city: "", state: "", country: "", pincode: "", phoneNumber: ""
    });
  };

  return (
    <div className="container my-3">
      <div className="p-3" style={{ border: '2px solid yellow', borderRadius: '10px', maxWidth: '500px', margin: '0 auto' }}>
        <h1 className='text-center'>Shipping Address</h1>
        <form className='my-3' onSubmit={submitHandler}>
          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputFullName1" className="form-label">Full Name</label>
              <input required name='fullName' value={formData.fullName} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputFullName1" />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputCountry1" className="form-label">Country</label>
              <input required name='country' value={formData.country} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputCountry1" />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputState1" className="form-label">State</label>
              <input required name='state' value={formData.state} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputState1" />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputCity1" className="form-label">City</label>
              <input required name='city' value={formData.city} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputCity1" />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputPincode1" className="form-label">Pincode</label>
              <input required name='pincode' style={{ appearance: 'none', MozAppearance: 'textfield', WebkitAppearance: 'none' }} value={formData.pincode} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="exampleInputPincode1" />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="exampleInputPhoneNumber1" className="form-label">Phone Number</label>
              <input required name='phoneNumber' value={formData.phoneNumber} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="exampleInputPhoneNumber1" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAddress1" className="form-label">Address/Nearby</label>
            <textarea required name='address' value={formData.address} onChange={onChangeHandler} className="form-control bg-dark text-light" id="exampleInputAddress1" />
          </div>

          <div className='d-grid col-12 mx-auto my-3'>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold' }}>Submit</button>
          </div>
        </form>

        {userAddress && (
          <div className="d-grid col-12 mx-auto my-3">
            <button onClick={() => navigate('/checkout')} className="btn btn-warning" style={{ fontWeight: 'bold' }}>Use Old Address</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;