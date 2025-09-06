import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ShowOrderProduct from './ShowOrderProduct';

const AllOrders = () => {
  const { userOrder } = useContext(AppContext);

  return (
    <div className="container my-5">
      <h1 className='text-center'>Your Order History</h1>
      {userOrder && userOrder.length > 0 ? (
        <div className="table-responsive"> {/* Make the table responsive */}
          <table className="table table-bordered border-primary bg-dark my-3">
            <thead className="bg-dark">
              <tr>
                <th scope="col" className="bg-dark text-light text-center">
                  Order Items
                </th>
                <th scope="col" className="bg-dark text-light text-center">
                  Payment Status
                </th>
                <th scope="col" className="bg-dark text-light text-center">
                  Shipping Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark">
              {userOrder.map((order, index) => (
                <tr key={index}>
                  <td className="bg-dark text-light">
                    <ShowOrderProduct items={order.orderItems} />
                  </td>
                  <td className="bg-dark text-light text-center">{order.payStatus}</td>
                  <td className="bg-dark text-light">
                    <ul style={{ fontWeight: "bold" }}>
                      <li>Name: {order.userShipping?.fullName}</li>
                      <li>Phone: {order.userShipping?.phoneNumber}</li>
                      <li>Address: {order.userShipping?.address}</li>
                      <li>Country: {order.userShipping?.country}</li>
                      <li>State: {order.userShipping?.state}</li>
                      <li>PinCode: {order.userShipping?.pincode}</li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className='text-center text-light'>No orders found.</h3>
      )}
    </div>
  );
};

export default AllOrders;