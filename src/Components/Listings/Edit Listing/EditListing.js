import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './EditListing.css'
import {Link} from 'react-router-dom'
import {UpdateListings} from '../../../Store/middleware/middleware'

class HostingHome extends Component 
{
    constructor(){
        super();
        this.state = {
            address: '',
            city: '',
            state: '',
            rent: '',
            beds: 0,
            guest: 0,
            rooms: 0,
            error: 'none',
            success: 0,
            loader: 'none',
            bedslessopacity: 0.5,
            bedsmoreopacity: 1,
            roomslessopacity: 0.5,
            roomsmoreopacity: 1,
            guestlessopacity: 0.5,
            guestmoreopacity: 1,
        }
        
    }
    onChange(e){
        this.setState({[e.target.id]: e.target.value});
    }
    decrement(e){
        e.preventDefault();
        if(this.state[e.target.id]>0){
            this.setState({[e.target.id]: --this.state[e.target.id]})
        }
        if(this.state[e.target.id] === 0){
            this.setState({[e.target.id + "lessopacity"]: 0.5})
        }
        if(this.state[e.target.id] === 15){
            this.setState({[e.target.id + "moreopacity"]: 1})
        }
    }
    increment(e){
        e.preventDefault();
        if(this.state[e.target.id]<16){
            this.setState({[e.target.id]: ++this.state[e.target.id]})
        }
        if(this.state[e.target.id] === 1){
            this.setState({[e.target.id + "lessopacity"]: 1})
        }
        if(this.state[e.target.id] === 16){
            this.setState({[e.target.id + "moreopacity"]: 0.5})
        }
    }
    UpdateData(e){
        e.preventDefault()
        if(this.state.address !=='' && this.state.city !=='' && this.state.state !=='' && this.state.rooms !==0 && this.state.beds !==0 && this.state.rent !=='' && this.state.guest !== 0)
        {
            this.setState({loader: 'block', error: 'none'})
            this.props.updateData(this.props.Listings,this.props.match.params.id , this.props.Listings[this.props.match.params.id]['id'], this.state.address, this.state.city, this.state.state, this.state.guest, this.state.beds, this.state.rooms, this.state.rent)
            this.setState({loader: 'none'})
        }
        else
            this.setState({error: 'block'})
    }
    changingState(para){
        if(this.props.Listings[this.props.match.params.id][para] === 16){
            this.setState({[para + 'lessopacity']: 1 ,[para + 'moreopacity']: 0.5})
        }
        else if(this.props.Listings[this.props.match.params.id][para] === 0){
            this.setState({[para + 'lessopacity']: 0.5, [para + 'moreopacity']: 1})
        }
        else
        this.setState({[para + 'lessopacity']: 1, [para + 'moreopacity']: 1})
        if(para === 'guest'){
            if(this.props.Listings[this.props.match.params.id][para + 's'] === 16){
                this.setState({[para + 'lessopacity']: 1 ,[para + 'moreopacity']: 0.5})
            }
            else if(this.props.Listings[this.props.match.params.id][para + 's'] === 0){
                this.setState({[para + 'lessopacity']: 0.5, [para + 'moreopacity']: 1})
            }
            else
            this.setState({[para + 'lessopacity']: 1, [para + 'moreopacity']: 1})
            this.setState({[para]: this.props.Listings[this.props.match.params.id][para + 's']})   
        }
        else
        this.setState({[para]: this.props.Listings[this.props.match.params.id][para]})
    }
    componentDidMount(){
            if(this.props.Listings.length >= 0){
                this.setState({
                    address: this.props.Listings[this.props.match.params.id]['address'],
                    city: this.props.Listings[this.props.match.params.id]['city'],
                    state: this.props.Listings[this.props.match.params.id]['state'],
                    rent: this.props.Listings[this.props.match.params.id]['rent']
                })
                this.changingState('guest');
                this.changingState('beds');
                this.changingState('rooms');
            }
    }
    UNSAFE_componentWillReceiveProps(){
        if(this.state.city === '')
        {
            if(this.props.Listings.length >= 0){
                this.setState({
                    address: this.props.Listings[this.props.match.params.id]['address'],
                    city: this.props.Listings[this.props.match.params.id]['city'],
                    state: this.props.Listings[this.props.match.params.id]['state'],
                    rent: this.props.Listings[this.props.match.params.id]['rent']
                })
                this.changingState('guest');
                this.changingState('beds');
                this.changingState('rooms');
            }
        }
    }

    render(){
        console.log(this.props.updatedListings)
        console.log(this.props.Listings[this.props.match.params.id])
        if(this.props.updatedListings)
        {
            return <Redirect to={'/listings/' + this.props.match.params.id} />
        }
        if(!this.props.user){
            return <Redirect to='/signin' />
        }
        else if(!this.props.Listings)
        {
            return <div className='EditListing' ><div className='loader'><i className="fa fa-refresh fa-spin"></i></div></div>
        }
        else
        {
            return(
                <div className="EditListing">
                    <div className='loader' style={{display: this.state.loader}}><i className="fa fa-refresh fa-spin"></i></div>
                    <div id='form'>
                        <div className="EditData">
                            <h1>Update Your Listing</h1>
                            <form>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colSpan='2'>
                                                    <label htmlFor="address">Address <span className="star">*</span></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan='2' >
                                                    <input type="text" value={this.state.address} onChange={(e)=>this.onChange(e) } id="address" placeholder="Anywhere" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="city">City <span className="star">*</span></label>
                                                </td>
                                                <td>
                                                    <label htmlFor="state">State / province <span className="star">*</span></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    <input type="text" value={this.state.city} onChange={(e)=>this.onChange(e) } id="city" placeholder="City" />
                                                </td>
                                                <td >
                                                    <input type="text" value={this.state.state} onChange={(e)=>this.onChange(e) } id="state" placeholder="State / Province" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                Maximum &nbsp; &nbsp;<span className="star">*</span><br /> No of Guests: 
                                                </td>
                                                <td>
                                                <div className="controling"><button onClick={(e)=>this.decrement(e)} id="guest" style={{opacity: this.state.guestlessopacity}} className="controls less">-</button><span id="guest">{this.state.guest}</span><button onClick={(e)=>this.increment(e)} id="guest" style={{opacity: this.state.guestmoreopacity}} className="controls more">+</button></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                Beds <span className="star">*</span>
                                                </td>
                                                <td>
                                                <div className="controling"><button onClick={(e)=>this.decrement(e)} id="beds" style={{opacity: this.state.bedslessopacity}} className="controls less">-</button><span id="beds">{this.state.beds}</span><button id="beds" onClick={(e)=>this.increment(e)} style={{opacity: this.state.bedsmoreopacity}} className="controls more">+</button></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                Rooms <span className="star">*</span>
                                                </td>
                                                <td>
                                                <div className="controling"><button onClick={(e)=>this.decrement(e)} id="rooms" style={{opacity: this.state.roomslessopacity}} className="controls less">-</button><span id="rooms">{this.state.rooms}</span><button id="rooms" onClick={(e)=>this.increment(e)} style={{opacity: this.state.roomsmoreopacity}} className="controls more">+</button></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    <label htmlFor="rent">Rent Fee (Rs. ) <span className="star">*</span></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan='2'>
                                                    <input type="number" value={this.state.rent} onChange={(e)=>this.onChange(e)} id="rent" placeholder="Price in Rs" />
                                                </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            <div id="error" style={{display: this.state.error}}>* Please fill all the Fields</div>
                                            <div className="center"><Link to={'/listings/' + this.props.match.params.id} ><button id='cancel'>Cancel</button></Link><button onClick={(e)=>this.UpdateData(e)} id="update">Update</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state)=>(
    {
        user: state.authReducer.auth,
        Listings: state.listingReducer.listing,
        updateMenu: state.listingReducer.updateMenu,
        updatedListings: state.listingReducer.updatedListing
    }
)
const mapDispatchToProps = (dispatch)=>(
    {
        page: (value)=>dispatch({type: 'pages', payload: value}),
        addlisting: (data)=>dispatch({type: 'addListing', payload: data}),
        updateMenu: (data)=>dispatch({type: 'updateMenu', payload: data}),
        updatedListing: ()=>dispatch({type: 'updatedListing', payload: false}),
        updateData: (listings,index, id, address, city, province, guests, beds, rooms, rent)=>dispatch(UpdateListings(listings,index, id, address, city, province, guests, beds, rooms, rent))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(HostingHome)