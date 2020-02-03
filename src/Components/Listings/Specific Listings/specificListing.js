import React, {Component} from 'react'
import './specificListing.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import left from './angle-left-solid.svg'
import right from './angle-right-solid.svg'
import {Link} from 'react-router-dom'
import {DeleteListings} from '../../../Store/middleware/middleware'

class SpecificListing extends Component
{
    constructor(){
        super();
        this.state = {
            index: 0,
            len: 0,
            loader: 'none',
            success: 0
        }
    }
    onPicChange(des)
    {
        if(des==='increment'){
            if(this.state.index < this.props.listings[this.props.match.params.id]['pic'].length - 1){
                this.setState({index: ++this.state.index})
            }
            else if(this.state.index === this.props.listings[this.props.match.params.id]['pic'].length - 1)
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
                this.setState({index: this.props.listings[this.props.match.params.id]['pic'].length - 1})
            }
        }
    }
    onDelete(email,id,city,state,listings,index)
    {
        this.setState({loader: 'block'})
        this.props.DeleteListings(email,id,city,state,listings,index)
    }
    render(){
        console.log(this.props.match.params.id)
        console.log(this.props.listings.length)
        if(this.props.updatedListings === 'updatedListing')
        {
            this.props.updatedListing();
            if(this.state.success<1){
                let temptime = setInterval(() => {
                    if(this.state.success<1.5){
                        this.setState({success: 0.05+this.state.success})
                    }
                    else{
                        clearInterval(temptime)
                        let dectime = setInterval(() => {
                            if(this.state.success>0){
                                this.setState({success: this.state.success-0.05})
                            }
                            else{
                                clearInterval(dectime)
                            }
                        }, 50);
                    }
                }, 50);
            }
            return <Redirect to={'/listings/' + this.props.match.params.id} />
        }
        if(this.props.updatedListings === 'deletedListings')
        {
            this.props.updatedListing();
            return <Redirect to='/listings' />
        }
        if(!this.props.user){
            this.props.page('listings/' + this.props.match.params.id )
            return <Redirect to='/signin' />
        }
        else if(this.props.listings.length === 0){
            return <Redirect to='/listings' />
        }
        else if(!this.props.listings){
            return <div className='SpecificListing'>
                        <div className='loaderlist'><i className="fa fa-refresh fa-spin"></i></div>
            </div>
        }
        else if(this.props.match.params.id>this.props.listings.length-1)
        {
            return <div style={{textAlign: 'center', fontStyle: 'italic', color: 'darkblue', textDecoration: 'underline'}} className='StayDetail'>
                <h2>Listing Not Found !!</h2>
            </div>
        }
        else{
            console.log(this.props.listings[this.props.match.params.id])
            return(
                <div className='SpecificListing'>
                        <div id="updatedSuccess" style={{opacity: this.state.success}}>Successfully Updated</div>
                        {
                            this.props.listings.filter((items,index)=> index === Number(this.props.match.params.id))
                         .map(items=>{
                             return(
                                    <div key='0' className='SpecificCard' >
                                        <div className='loader' style={{display: this.state.loader}}><i className="fa fa-refresh fa-spin"></i></div>
                                        <div className='listingimages'>
                                        <img id='left' onClick={()=>this.onPicChange('decrement')} className='arrows' src={left} alt='' /><img id='slider' src={items.pic[this.state.index]} alt=''/><img onClick={()=>this.onPicChange('increment')} id='right' className='arrows' alt='' src={right} />
                                        </div>
                                        <div id='listdetails' >
                                            <h2>Rooms: {items.rooms}</h2>
                                            <h2>Beds: {items.beds}</h2>
                                            <h2>Guests: {items.guests}</h2>
                                            <h2>Address: {items.address}, {items.city}, {items.state} </h2>
                                            <h2>Rent: {items.rent} </h2>
                                            <Link to={'/editlisting/' + this.props.match.params.id} ><button className='buttons'>Edit</button></Link>
                                            <button onClick={()=>this.onDelete(items.postedBy,items.id,items.city,items.state,this.props.listings, this.props.match.params.id)} className='buttons'>Delete</button>
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
        listings: state.listingReducer.listing,
        updateMenu: state.listingReducer.updateMenu,
        updatedListings: state.listingReducer.updatedListing
    }
)
const mapDispatchToProps = (dispatch)=>
(
    {
        page: (payload)=>dispatch({type: 'pages', payload: payload}),
        updatedListing: ()=>dispatch({type: 'updatedListing', payload: false}),
        DeleteListings: (email,id,city,state,listings,index)=>dispatch(DeleteListings(email,id,city,state,listings,index))
    }
)
export default connect(mapStateToProps ,mapDispatchToProps)(SpecificListing);