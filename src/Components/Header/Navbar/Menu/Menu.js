import React, {Component} from 'react';
import './Menu.css'
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux'
import {Logout} from '../../../../Store/middleware/middleware'

class Menu extends Component{
    render(){
        console.log(this.props.data)
        return(
            <div className="Menu"> 
                    <ul>
                        {
                            ((this.props.isLogedin && this.props.signUpStatus !== 'process') ? <SigninMenu updateMenu={this.props.updateMenu} logout={this.props.logout} addlisting={(data)=>this.props.addlisting(data)} listing={this.props.listings} addData={this.props.addData} data={this.props.data} isLogedin={this.props.isLogedin} /> : <SignoutMenu />)
                        }
                    </ul>
            </div>
        )
    }
}
const mapStateToProps = (state)=>(
    {
        isLogedin: state.authReducer.auth,
        temp: state.authReducer.temp,
        data: state.authReducer.data,
        listings: state.listingReducer.listing,
        updateMenu: state.listingReducer.updateMenu,
        signUpStatus: state.authReducer.signUpStatus
    }
)
const mapDispatchToProps = (dispatch)=>({
    addData: (data)=>dispatch({type: 'dataFromFirestore' , payload: data}),
    addlisting: (data)=>dispatch({type: 'addListing', payload: data}),
    logout: ()=>dispatch(Logout())
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

class SigninMenu extends Component{
    constructor(){
        super();
        this.state = {
            img1: 'none',
            listingDropdown: 'none',
            listing : false
        }
    }
    dropDown(e){
        this.setState({listingDropdown: 'none', img1: 'none'})
        if(this.state[e.target.id] === 'none')
        this.setState({[e.target.id]: 'inline-block'})
    }
    UNSAFE_componentWillUpdate(){
        if(this.props.listing !== this.state.listing){
            this.setState({listing: this.props.listing})
        }
    }

render(){
    console.log(this.props.isLogedin)
    console.log(this.props.data)
    console.log(this.props.listing)
    return(
        <div>
             <Link to="/hostahome"><li>Host a Home</li></Link>
             <li id="listingDropdown" onClick={(e)=>this.dropDown(e)}>Your Listings</li>
             <div id="listingsDropDown" style={{display: this.state.listingDropdown}}>
                 <h5>Your Listings {this.state.listing ?'(' +this.state.listing.length + ')': ''}</h5>
                 <ul>
                    <div className='content'>
                        {!this.state.listing ?
                        <span className='nolistings'>Loading...</span>: ( this.state.listing.length > 0 ?  
                        this.state.listing.map((item,index)=>{
                            return(
                                <li className='items' key={index}>
                                    <Link to={'/listings/'+index}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td rowSpan="4"><img src={item.pic[0]} alt="" height="58" width="58" /></td>
                                        </tr>
                                        <tr>
                                            <th>{item.rooms} Rooms -&nbsp;</th>
                                            <th>{item.beds} Beds -&nbsp;</th>
                                            <th>{item.guests} Guests</th>
                                        </tr>
                                        <tr>
                                            <th>{item.city}, {item.state}</th>
                                        </tr>
                                        <tr>
                                            <th>Rs. {item.rent}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                </Link>
                            </li>)}): <span className='nolistings'>No Listings...</span>)}
                    </div>
                    <Link to='/listings'><li id="viewAllListings"><span> View All Listings</span></li></Link>
                    </ul>
             </div>
             <Link to="/"><li>Help</li></Link>
             <Link to="/"><li>Messages</li></Link>
             <li id="img" ><span ><img id="img1" onClick={(e)=>this.dropDown(e)} src={this.props.data.pic} alt={this.props.isLogedin.name} /></span></li>
             <div style={{display: this.state.img1}} id="accountDetails">
                 <table>
                     <tbody>
                        <tr>
                             <th>Name: </th>
                             <td><span>{this.props.data.name}</span></td>
                         </tr>
                         <tr>
                             <th>Email: </th>
                             <td><span>{this.props.data.email}</span></td>
                         </tr>
                         <tr>
                             <td colSpan="2"><span id="logout" onClick={()=>this.props.logout()}>Logout</span></td>
                         </tr>
                     </tbody>
                 </table>
                    
             </div>
        </div>
    )
    
}
}
class SignoutMenu extends Component{
render(){
    return(
        <div>
             <Link to="/hostahome"><li>Host a Home</li></Link>
             <Link to="/"><li>Help</li></Link>
             <Link to="/signup"><li>Sign up</li></Link>
             <Link to="/signin"><li>Sign in</li></Link>
        </div>
    )
}
}
