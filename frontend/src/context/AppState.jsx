import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {

    const url = "http://localhost:4000/api"
    const [products, setProducts] = useState([])
    const [token, setToken] = useState([])
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [user, setUser] = useState()
    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)
    const [userAddress, setUserAddress] = useState("")
    const [userOrder, setUserOrder] = useState([])


    useEffect(() => {
        const fetchProducts = async () => {
            //console.log("Fetching products..."); // Log when fetching products

            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            //console.log(api?.data?.products)
            //console.log(api?.data?.products); // Log the fetched products
            setProducts(api?.data?.products);
            setFilteredData(api?.data?.products)
            userProfile()
        }
        fetchProducts();
        getUserCart()
        getAddress()
        getUserOrder()
    }, [token,reload])

    useEffect(()=>{
        let lstoken = localStorage.getItem('token')
        //setToken(localStorage?.getItem(token))
        //console.log("ls token:- ",lstoken)
        if(lstoken){
            setToken(lstoken)
            setisAuthenticated(true)
        }
        //setToken(lstoken)
    },[])


    //Register User
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`,
            {
                name, email, password
            },
            {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
        //alert(api.data.message)
        //console.log("user register",api)
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        return api.data;
    }

    //Login User
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`,
            {
                email, password
            },
            {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })

        //alert(api.data.message)
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setToken(api?.data?.token)
        setisAuthenticated(true)
        localStorage.setItem('token', api?.data?.token)
        //console.log("user login", api.data)
        return api?.data;
    }

    //Logout User
    const logout = () => {
        setisAuthenticated(false)
        setToken("")
        localStorage.removeItem('token')
        toast.success("Logout Successfully....", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        
    }

    // User Profile
    const userProfile = async () => {

        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth" : token
            },
            withCredentials: true
        })
        //console.log(api?.data?.user)

        setUser(api?.data?.user)
        return api?.data
    }
    
    //Add To Cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imgSrc}, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        setReload(!reload);
        //console.log('my cart', api)
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        return api?.data
        
    }


    // Get User cart
    const getUserCart = async () => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        //console.log("user cart", api?.data?.cart)
        setCart(api?.data?.cart)
        return api?.data
    }


    // decrease Qty
    const decreaseQty = async (productId, qty) => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.post(`${url}/cart/--qty`,{productId, qty}, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        //console.log("user cart", api?.data?.cart)
        //setCart(api?.data?.cart)
        //console.log("decrease qty", api)
        setReload(!reload);
        return api?.data
    }

    // Remove from cart
    const removeFromCart = async (productId) => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.delete(`${url}/cart/remove/${productId}`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        console.log("remove from cart", api)
        //setCart(api?.data?.cart)
        //console.log("decrease qty", api)
        setReload(!reload);
        return api?.data
    }

    // Clear Cart
    const clearCart = async () => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.delete(`${url}/cart/clear`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        //console.log("remove from cart", api)
        //setCart(api?.data?.cart)
        //console.log("decrease qty", api)
        setReload(!reload);
        return api?.data
    }

    // Address
    const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
        //console.log("Fetching products..."); // Log when fetching products

        const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber}, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        toast.success(api?.data?.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        //console.log("remove from cart", api)
        //setCart(api?.data?.cart)
        //console.log("decrease qty", api)
        setReload(!reload);
        return api?.data
    }


    //Get User Latest address
    const getAddress = async () => {
        const api = await axios.get(`${url}/address/get`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        //console.log("user address", api?.data?.userAddress)
        setUserAddress(api?.data?.userAddress)
        return api?.data
        
    }

    // get User Order
    const getUserOrder = async () => {
        const api = await axios.get(`${url}/payment/userorder`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        //console.log("user order", api?.data)
        setUserOrder(api?.data)
        return api?.data
        
    }
    //console.log("userOrder", userOrder)


    return (
    <AppContext.Provider value={{
        products,
        register,
        login,
        logout,
        token,
        setToken,
        isAuthenticated,
        setisAuthenticated,
        url,
        filteredData,
        setFilteredData,
        user,
        addToCart,
        getUserCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder

    }}>
        {props.children}
    </AppContext.Provider>
    );

}

export default AppState
