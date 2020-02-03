import React, {Component} from 'react';
import './Navbar.css'
import Menu from './Menu/Menu';
import {Link} from 'react-router-dom'
class Navbar extends Component
{
    render(){
        return(
            <div className="Navbar">
               <Link to='/' ><div id="logo"></div></Link>
               <Menu id="Menu" />
               <div className="clearBoth"></div>
            </div>
        )
    }
}
export default Navbar;