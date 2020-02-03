import React, {Component} from 'react';
import './header.css'
import SearchForm from './Search Form/searchForm';

class Header extends Component{
    render(){
        return(
            <div className="Header">
                <SearchForm />
            </div>
        )
    }
}
export default Header;