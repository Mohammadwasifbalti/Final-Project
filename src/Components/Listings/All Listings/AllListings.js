import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './AllListings.css';
import {Redirect} from 'react-router-dom'

class AllListings extends Component
{
    render(){
        console.log(this.props.listings)
        if(!this.props.user){
            this.props.page('listings')
            return <Redirect to='/signin' />
        }
        else{
            return(
                <div className="AllListings">
                    <div className="middle">
                        <h2 className='center listinghead'>Your Listings</h2>
                        {console.log(this.props.listings)}
                        {(!this.props.listings ? 
                        <div className='listingsloader' ><i className="fa fa-refresh fa-spin"></i></div>
                        : (this.props.listings.length>0 ?
                        this.props.listings.map((items,index)=><ListingsItems  list={items} index={index} key={index} />)
                        : 'No Listings'))}
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state)=>(
    {   
        user: state.authReducer.auth,
        listings: state.listingReducer.listing,
        updateMenu: state.listingReducer.updateMenu
    }
)
const mapDispatchToProps = (dispatch)=>
(
    {
        page: (value)=>dispatch({type: 'pages', payload: value}),
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(AllListings);

class ListingsItems extends Component
{
    render(){
        // console.log(this.props.list)
        return(
            <div className='ListingsItems'>
                <Link to={'listings/'+this.props.index}>
                    <div className='listingsImage'>
                        <img src={this.props.list.pic[0]} alt=''/>
                    </div>
                    <div className='details'><span className='listdesc'> {this.props.list.rooms} Rooms - {this.props.list.beds} Beds - {this.props.list.guests} Guests</span>
                    <span className='listdesc'> {this.props.list.location} </span>
                    <span className='listdesc' >Rs.{this.props.list.rent} </span>
                    </div>
                </Link>
            </div>
        )
    }
}