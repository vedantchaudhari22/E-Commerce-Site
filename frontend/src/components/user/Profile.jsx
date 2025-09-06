import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import AllOrders from '../AllOrders';

const Profile = () => {
    const { user } = useContext(AppContext);

    return (
        <div className="container-fluid">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 text-center">
                        <h1>Welcome {`${user?.name}`} 🤩</h1>
                        <h3>Email: {`${user?.email}`}</h3>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <AllOrders />
            </div>
        </div>
    );
}

export default Profile;