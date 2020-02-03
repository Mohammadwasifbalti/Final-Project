import React, {Component} from 'react'
import './cards.css'

class Cards extends Component
{
    render(){
        return(
            <div className="Cards">
                <img src={this.props.path} className="pic" alt={this.props.name}/>
                <h4 className="picdes">{this.props.name}</h4>
            </div>
        )
    }
}
export default Cards;