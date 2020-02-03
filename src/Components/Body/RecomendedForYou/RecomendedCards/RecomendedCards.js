import React, {Component} from 'react'
import './Recomendedcards.css'
import {Link} from 'react-router-dom'

class RecomendedCards extends Component
{
    render(){
        console.log(this.props.index)
        return(
            <Link key={this.props.index} to={'/details/' + this.props.index}><div className="RecomendedCards">
                <img src={this.props.img} alt={this.props.name} />
                <div className="cardhead">
                    <h3>{this.props.name}</h3>
                    <h4>${this.props.price}/night average</h4>
                </div>
            </div>
            </Link>
        )
    }
}
export default RecomendedCards