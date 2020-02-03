import React, {Component} from 'react'
import logo from '../Header/Navbar/logo.png'
import './Footer.css'

class Footer extends Component
{
    render(){
        return(
            <div className="Footer" >
                <div>
                    <img src={logo} id="footerLogo" alt="logo" height="40px" />
                    <h5> &copy; 2019 Airbnb, Inc. All rights reserved. </h5>
                    <div style={{clear: "both"}}></div>
                </div>

            </div>
        )
    }
}
export default Footer;