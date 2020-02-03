import React, {Component} from 'react'
import RecomendedCards from './RecomendedCards/RecomendedCards'
import './Recomended.css'
import left from './Images/left.png'
import right from './Images/right.png'
import {connect} from 'react-redux';
class Recomended extends Component
{
    constructor(){
        super();
        this.state={
            index: 0,
            decopacity: 0,
            incopacity: 1,
        }
    }
    back(){
        if(this.state.index>0)
        {
            this.setState({index: --this.state.index, incopacity: 1})
        }
        if(this.state.index<1){
            this.setState({decopacity: 0})
        }
    }
    next(){
        if(this.state.index<this.props.stays.length-5){
            this.setState({index: ++this.state.index, decopacity: 1})
        }
        if(this.state.index>this.props.stays.length-6){
            this.setState({incopacity: 0})
        }
    }
    render(){
        console.log(this.props.stays)
        return(
            <div className="Recomended">
                {this.props.stays ?
                <div>
                <h2>Recomended For You</h2>
                <div>
                    {(this.props.stays ? <span><button onClick={()=>this.back()} style={{opacity: this.state.decopacity, paddingRight:"11px"}} ><img src={left} alt="prev" /></button>
                    {this.props.stays.filter((items,index1)=>(index1<this.state.index+5 && index1>=this.state.index))
                        .map((items,index)=><RecomendedCards key={index} index={this.state.index + index} img={items.pic[0]} name={items.city} price={items.rent} />)}
                    <button onClick={()=>this.next()} style={{opacity: this.state.incopacity, marginLeft: "-2.5%", paddingLeft: "11px"}} ><img src={right} alt="next" /></button></span>:<div className='listingsloader' ><i className="fa fa-refresh fa-spin"></i></div>)}
                </div></div> : null}
            </div>
        )
    }
}
const mapStateToProps = (state)=>
(
    {
        stays: state.reducer.stays,
        updateMenu: state.reducer.updateMenu
    }
)
export default connect(mapStateToProps)(Recomended)