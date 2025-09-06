import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppContext from '../context/AppContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterByCategory = (cat) => {
    if (cat === "") {
      setFilteredData(products);
      return;
    } else if (typeof cat !== 'string') return;

    setFilteredData(products.filter((data) => data?.category?.toLowerCase() === cat?.toLowerCase()));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  }


  return (
    <>
      <div className='nav sticky-top'>
        <nav className="navbar navbar-expand-lg navbar">
          <div className="container-fluid">
            
            <Link to={'/'} className="navbar-brand">
              <img src="/Logo.png" alt="Brand Logo" style={{ width: '50px', height: '50px'}} />
            </Link>
          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <form className="d-flex me-auto" onSubmit={submitHandler}>
                <input className="form-control me-2" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Products Here......' aria-label="Search" />
                <button className="btn btn-warning" type="submit">Search</button>
              </form>
              <div className="d-flex">
              
                {isAuthenticated ? (
                  <>
                    <Link to={'/cart'} className="btn btn-warning position-relative mx-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                      {cart?.items?.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart?.items?.length}
                          <span className="visually-hidden">unread messages</span>
                        </span>
                      )}
                    </Link>
                    <Link to={'/profile'} className="btn btn-warning mx-2">Profile
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
                    </Link>
                    <button className="btn btn-danger mx-2" onClick={() => { logout(); navigate('/') }}>Logout
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={'/login'} className="btn btn-warning mx-2">Login
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                    </Link>
                    <Link to={'/register'} className="btn btn-warning mx-2">Register 📝
                      {/* Register SVG Icon */}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {location.pathname === '/' && (
        <>
          {/* Sub Navbar for larger screens */}
          <div className="sub_bar d-none d-lg-flex justify-content-around" style={{backgroundColor:'#0b4480'}}>
            <div className="items" onClick={() => setFilteredData(products)}>No Filters</div>
            <div className="items" onClick={() => filterByCategory("laptops")}>Laptops</div>
            <div className="items" onClick={() => filterByCategory("mobiles")}>Mobiles</div>
            <div className="items" onClick={() => filterByCategory("cameras")}>Cameras</div>
            <div className="items" onClick={() => filterByCategory("headphones")}>Headphones</div>
            <div className="items" onClick={() => filterByCategory("mens wear")}>Mens</div>
            <div className="items" onClick={() => filterByCategory("womens wear")}>Womens</div>
            <div className="items" onClick={() => filterByCategory("kids wear")}>Kids</div>
            <div className="items" onClick={() => filterByCategory("watches")}>Watches</div>
            <div className="items" onClick={() => filterByCategory("shoes")}>Shoes</div>
          </div>

          {/* Dropdown for smaller screens */}
          <div className="d-lg-none">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item" onClick={() => setFilteredData(products)}>No Filters</li>
                <li className="dropdown-item" onClick={() => filterByCategory("laptops")}>Laptops</li>
                <li className="dropdown-item" onClick={() => filterByCategory("mobiles")}>Mobiles</li>
                <li className="dropdown-item" onClick={() => filterByCategory("cameras")}>Cameras</li>
                <li className="dropdown-item" onClick={() => filterByCategory("headphones")}>Headphones</li>
                <li className="dropdown-item" onClick={() => filterByCategory("mens wear")}>Mens</li>
                <li className="dropdown-item" onClick={() => filterByCategory("womens wear")}>Womens</li>
                <li className="dropdown-item" onClick={() => filterByCategory("kids wear")}>Kids</li>
                <li className="dropdown-item" onClick={() => filterByCategory("watches")}>Watches</li>
                <li className="dropdown-item" onClick={() => filterByCategory("shoes")}>Shoes</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar;