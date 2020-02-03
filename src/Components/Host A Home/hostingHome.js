import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './hosting.css'
import {HostHome} from '../../Store/middleware/middleware'

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
            pic: [],
            bedslessopacity: 0.5,
            bedsmoreopacity: 1,
            roomslessopacity: 0.5,
            roomsmoreopacity: 1,
            guestlessopacity: 0.5,
            guestmoreopacity: 1,
        }
        
    }
    onChange(e){
        if(e.target.id !== 'pic')
        this.setState({[e.target.id]: e.target.value});
        else{
            let temp = [];
            if(e.target.files.length>0)
            {
                for(let i=0; i<e.target.files.length; i++){
                    temp.push(e.target.files[i]);
                }
                this.setState({pic: temp})
            }
        }
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
    submitData(e){
        e.preventDefault()
        if(this.state.address !=='' && this.state.city !=='' && this.state.state !=='' && this.state.rooms !==0 && this.state.beds !==0 && this.state.rent !=='' && this.state.guest !==0 && this.state.pic.length !== 0)
        {
            this.setState({loader: 'block', error: 'none'})
            this.props.HostHome(this.state.address, this.state.city, this.state.state, this.state.rooms, this.state.beds, this.state.rent, this.state.guest, this.state.pic, this.props);
        }
        else
            this.setState({error: 'block'})
    }
    
    Success()
    {
        this.setState({
            address: '',
            city: '',
            state: '',                                
            rent: '',
            beds: 0,
            guest: 0,
            rooms: 0,
            success: 0,
            bedslessopacity: 0.5,
            bedsmoreopacity: 1,
            roomslessopacity: 0.5,
            roomsmoreopacity: 1,
            guestlessopacity: 0.5,
            guestmoreopacity: 1,
            loader: 'none'
        })
        this.refs.file.value='';
        
        let temptime = setInterval(() => {
            if(this.state.success<8.1){
                this.setState({success: 0.2+this.state.success})
            }
            else{
                clearInterval(temptime)
                let dectime = setInterval(() => {
                    if(this.state.success>0){
                        let temp = this.state.success - 0.3;
                        this.setState({success: temp})
                    }
                    else{
                        clearInterval(dectime)
                    }
                }, 100);
            }
        }, 50);
    }
    errorStatus()
    {
        this.setState({error: this.props.hostingStatus, loader: 'none'})
    }
    render(){
        if(this.props.hostingStatus === 'hostingSuccess')
        {
            this.Success();
            this.props.HostingStatus();
        }
        else if(this.props.hostingStatus)
        {
            this.errorStatus();
            this.props.HostingStatus();
        }
        if(!this.props.user){
            this.props.page('hostahome')
            return <Redirect to='/signin' />
        }
        else
        {
            console.log(this.props.user.email)
            return(
                <div className="HostingHome">
                    <div className='loader' style={{display: this.state.loader}}><i className="fa fa-refresh fa-spin"></i></div>
                    <div id="success" style={{opacity: this.state.success}}>Successfully Added</div>
                    <div id='form'>
                        <div className="addData">
                            <h1>Host A Home</h1>
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
                                            <tr>
                                            <td >
                                                <label htmlFor="pass">Add Photos <span className="star">*</span></label>
                                            </td>
                                            </tr>
                                            <tr>
                                                <td colSpan='2'>
                                                    <input ref='file' type="file" multiple accept='image/*' id="pic" onChange={(e)=>this.onChange(e)} required />
                                                </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            <div id="error" style={{display: this.state.error}}>* Please fill all the Fields</div>
                                            <div className="center"><button onClick={(e)=>this.submitData(e)} id="submit">Host Your Place</button></div>
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
        stays: state.reducer.stays,
        hostingStatus: state.reducer.hostingStatus
    }
)
const mapDispatchToProps = (dispatch)=>(
    {
        page: (value)=>dispatch({type: 'pages', payload: value}),
        HostHome: (address,city,state,rooms,beds,rent,guest,pic, props) => dispatch( HostHome(address, city, state, rooms, beds, rent, guest, pic, props)),
        HostingStatus: ()=>dispatch({type: 'hostingStatus', payload: false})
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(HostingHome)