import React , {Component} from 'react';
import Cards from './cards/cards';
import './ExploreAirbnb.css'
import Home from './pictures/Home.jpeg'
import Adventures from './pictures/Adventures.jpeg'
import Experiences from './pictures/Experiences.jpeg'
import Restaurants from './pictures/Restaurants.jpeg'
import {Link} from 'react-router-dom'

class ExploreAirbnb extends Component{
    render(){
        return(
            <div className="ExploreAirbnb">
                <h2>Explore Airbnb</h2>
                <Link to='/stays'><Cards name="Stay" path={Home} /></Link>
                <Cards name="Experiences" path={Experiences} />
                <Cards name="Adventures" path={Adventures} />
                <Cards name="Restaurants" path={Restaurants} />
            </div>
        )
    }
}
export default ExploreAirbnb;