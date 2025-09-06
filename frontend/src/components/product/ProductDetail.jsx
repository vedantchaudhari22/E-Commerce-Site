import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'

const ProductDetail = () => {

  const { products, filteredData, addToCart } = useContext(AppContext);
    const [product, setProduct] = useState()
    const { id } = useParams()
    const url = "http://localhost:4000/api"

    useEffect(() => {
        const fetchProduct = async () => {
          const api = await axios.get(`${url}/product/${id}`, {
            headers: {
              "Content-Type": "Application/json",
            },
            withCredentials: true,
          });
        //   console.log(api.data.product);
        setProduct(api.data.product)
          //   setProducts(api.data.products);
        };
        fetchProduct();
      }, [id]);

    return (
        <>
            <div className="container text-center my-5" style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <div className="left">
                    <img src={product?.imgSrc} alt="" style={{ 
                        width: '250px',
                        height: '250px',
                        borderRadius:'10px',
                         border:'2px solid red' }} />
                </div>
                <div className="right">
                    <h3>{product?.title}</h3>
                    <p>{product?.description}</p>
                    <h4>Price :- {product?.price}{" "}{"₹"}</h4>
                    <h5>Category :- {product?.category}</h5>
                    <div className='my-5 '>
                        {/* <button className="btn btn-danger mx-3" style={{fontWeight: 'bold'}}>Buy Now</button> */}
                        <button className="btn btn-warning" onClick={()=>addToCart(product?._id, product?.title, product?.price, 1, product.imgSrc)} style={{fontWeight: 'bold'}}>Add To Cart</button>
                    </div>
                </div>
            </div>
            <RelatedProduct category={product?.category}/>
        </>
    )
}

export default ProductDetail