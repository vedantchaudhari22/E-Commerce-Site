import React from 'react'
import AppContext from '../context/AppContext'
import { useContext, useEffect, useState } from 'react'
import ShowOrderProduct from './ShowOrderProduct'

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext)
  const [latestOrder, setLatestOrder] = useState({})

  useEffect(() => {
    if(userOrder){
      //setLatestOrder(userOrder[userOrder.length - 1])
      setLatestOrder(userOrder[0])
    }

    //console.log("latestOrder", latestOrder)
  },[userOrder])

  return (
    <>
      <div className="container my-5">
        <h1 className='text-center'>Your Order Has Been Confirm 🤩</h1>
        <h3 className='text-center'>It Will Delivered Soon 🚚</h3>

        <div className="container">
          

          <table className="table table-bordered border-primary bg-dark">
            <thead className="bg-dark">
              <tr>
                <th scope="col" className="bg-dark text-light text-center">
                  Order Items
                </th>

                <th scope="col" className="bg-dark text-light text-center">
                  Order Details & Shipping Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark">
              <tr>
                <td className="bg-dark text-light">
                  <ShowOrderProduct items={latestOrder?.orderItems} />
                </td>
                <td className="bg-dark text-light">
                  <ul style={{ fontWeight: "bold" }}>
                    <li>Order ID : {latestOrder?.orderId}</li>
                    <li>Payment Id : {latestOrder?.paymentId}</li>
                    <li>Payment Status : {latestOrder?.payStatus}</li>
                    <li>Name : {latestOrder?.userShipping?.fullName}</li>
                    <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                    <li>Country : {latestOrder?.userShipping?.country}</li>
                    <li>State : {latestOrder?.userShipping?.state}</li>
                    <li>PinCode : {latestOrder?.userShipping?.pincode}</li>
                    <li>Address : {latestOrder?.userShipping?.address}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="container text-center my-5">
          <button
            className="btn btn-secondary btn-lg"
            style={{ fontWeight: "bold" }}
            
          >
            Procced To Pay
          </button>
        </div> */}
      </div>
    </>
  )
}

export default OrderConfirmation