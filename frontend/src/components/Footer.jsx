import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between gap-4 my-5 mt-5 text-sm p-5" style={{backgroundColor:' #053262'}}>
                <div className="mb-4">
                <img src="/Logo.png" alt="Brand Logo" style={{ width: '50px', height: '50px'}} />
                    <p className="w-100 text-light">
                        TrendyExpress is a one-stop destination for all your fashion needs.
                        Your one-stop shop for the latest in clothing, electronics, fashion shoes, and watches and many more.
                    </p>
                </div>
    
            
    
                <div>
                    <p className="h5 font-weight-light m-3 text-center">GET IN TOUCH</p>
                    <ul className="list-unstyled text-light text-center">
                        <li>+91 1234567890</li>
                        <li>trendy@express.com</li>
                    </ul>
                </div>
                <p className="py-3 text-md text-center m-3" style={{backgroundColor:' #053262'}}>Reserved Copyrights 2025 @ TrendyExress.in</p>
            </div>


            {/* <div>
               
                <p className="py-3 text-md text-center" style={{backgroundColor:' #053262'}}>Reserved Copyrights 2025 @ TrendyExress.in</p>
            </div> */}



        </div>
    );
}

export default Footer