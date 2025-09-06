import React, { useState, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext)
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
    }
    setQty(qty)
    setPrice(price)
  }, [cart])

  //console.log("cart", cart)


  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
          <div className='text-center my-5'>
            <button onClick={() => navigate('/')} 
            className='btn btn-warning mx-3' 
            style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Continue Shopping...
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></button>
          </div>
        </>
      ) : (
        <>
          <div className='my-5 text-center'>
            <button className='btn btn-info mx-3' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total Quantity :- {qty}</button>
            <button className='btn btn-warning mx-3' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total Price :- {price}</button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => <div key={product._id} className='container p-3 bg-dark my-5 text-center'>
        <div style={{ display: 'flex', justifyContent: 'space-around' , alignItems:'center'}}>
          <div className="cart_img">
            <img src={product?.imgSrc} alt="" style={{ width: '100px', height: '100px', border: '2px solid red', borderRadius: '10px' }} />
          </div>
          <div className="cart_desc">
            <h2>{product?.title}</h2>
            <h4>{product?.price}{" "}{"₹"}</h4>
            <h5>Quantity :- {product?.qty}</h5>
          </div>
          <div className="cart_action">
            <div className="btn btn-warning mx-3" onClick={() => decreaseQty(product?.productId, 1)} style={{ fontWeight: 'bold' }}>Qty <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg></div>
            <div className="btn btn-info mx-3" onClick={() => addToCart(product?.productId, product?.title, product?.price / product?.qty, 1, product.imgSrc)} style={{ fontWeight: 'bold' }}>Qty <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></div>
            <div className="btn btn-danger mx-3" style={{ fontWeight: 'bold' }}
              onClick={() => {
                if (confirm("Are you sure to remove this product from cart?")) {
                  removeFromCart(product?.productId)
                }
              }}
            >Remove <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></div>
          </div>
        </div>
      </div>)}
      {cart?.items?.length > 0 && (
        <>
          <div className="container text-center my-5">
            <button onClick={() => navigate('/shipping')} className="btn btn-warning mx-3" style={{ fontWeight: 'bold', }}>Checkout <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg></button>
            <button className="btn btn-danger mx-3" style={{ fontWeight: 'bold', }}
              onClick={() => {
                if (confirm("Are you sure to clear cart?")) {
                  clearCart()
                }
              }}>Clear Cart 🗑</button>
          </div>
        </>
      )}

    </>
  )
}

export default Cart