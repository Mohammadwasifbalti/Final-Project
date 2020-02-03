import React, {Component} from 'react'
import './StayDetail.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import left from '../Listings/Specific Listings/angle-left-solid.svg'
import right from '../Listings/Specific Listings/angle-right-solid.svg'

class StayDetail extends Component
{
    constructor(){
        super();
        this.state = {
            index: 0,
            len: 0,
            loader: 'none',
        }
    }
    onPicChange(des)
    {
        if(des==='increment'){
            if(this.state.index < this.props.stays[this.props.match.params.id]['pic'].length - 1){
                this.setState({index: ++this.state.index})
            }
            else if(this.state.index === this.props.stays[this.props.match.params.id]['pic'].length - 1)
            {
                this.setState({index: 0})
            }
        }
        else {
            if(this.state.index>0){
                this.setState({index: --this.state.index})
            }
            else if(this.state.index === 0 )
            {
                this.setState({index: this.props.stays[this.props.match.params.id]['pic'].length - 1})
            }
        }
    }
    render(){
        console.log(this.props.match.params.id)
        console.log(this.props.stays.length)
        if(this.props.stays.length === 0){
            return <Redirect to='/listings' />
        }
        else if(!this.props.stays){
            return <div className='StayDetail'>
                        <div className='loaderlist'><i className="fa fa-refresh fa-spin"></i></div>
            </div>
        }
        else if(this.props.stays.length<this.props.match.params.id){
            return <div style={{textAlign: 'center', fontStyle: 'italic', color: 'darkblue', textDecoration: 'underline'}} className='StayDetail'>
                <h2>Item Not Found !!</h2>
            </div>
        }
        else{
            console.log(this.props.stays[this.props.match.params.id])
            return(
                <div className='StayDetail'>
                        {
                            this.props.stays.filter((items,index)=> index === Number(this.props.match.params.id))
                         .map(items=>{
                             console.log(items);
                             return(
                                    <div key='0' className='SpecificCard' >
                                        <div id='userdetails'>
                                            {console.log(items.authorName)}
                                        <span>posted By &nbsp;: </span><img src={items.authorPic} id='smallpic' height='40px' width='40px' alt='' /><span id='username'> {items.authorName}</span><div style={{clear: 'both'}} ></div>
                                        </div>
                                        <div className='loader' style={{display: this.state.loader}}><i className="fa fa-refresh fa-spin"></i></div>
                                        <div className='listingimages'>
                                        <img id='left' onClick={()=>this.onPicChange('decrement')} className='arrows' src={left} alt='' /><img id='slider' src={items.pic[this.state.index]} alt=''/><img onClick={()=>this.onPicChange('increment')} id='right' className='arrows' alt='' src={right} />
                                        </div>
                                        <div id='listdetails' >
                                            <h2>Rooms: {items.rooms}</h2>
                                            <h2>Beds: {items.beds}</h2>
                                            <h2>Guests: {items.guests}</h2>
                                            <h2>Address: {items.address}, {items.city}, {items.state} </h2>
                                            <h2>Rent: Rs.{items.rent} </h2>
                                            <button className='contactbuttons' > Contact</button>
                                        </div>
                                    </div>
                                    )
                                })
                        }
                        
                </div>
            )
        }
    }
}
const mapStateToProps = (state)=>(
    {   
        user: state.authReducer.auth,
        stays: state.reducer.stays,
        updateMenu: state.reducer.updateMenu
    }
)
const mapDispatchToProps = (dispatch)=>
(
    {
        page: (payload)=>{dispatch({type: 'pages', payload: payload})}
    }
)
export default connect(mapStateToProps ,mapDispatchToProps)(StayDetail);