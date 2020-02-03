import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stays.css'
import {Link} from 'react-router-dom'

class Stays extends Component
{
    componentWillUnmount(){
        this.props.searching(false)
    }
    render(){
        console.log(this.props.searchList)
        if(!this.props.stays)
        {
            console.log('empty')
            return ( 
            <div className='Stays'>
                <div className='Staysloader'><i className="fa fa-refresh fa-spin"></i></div>
            </div>)
        }
        else if(!this.props.searchList)
        return(
            <div className='Stays' >
                <h1>Stays</h1>
                {this.props.stays.map((items,index)=>{
                    console.log(items)
                    return(
                        <Link key={index} to={'/details/' + index} >
                        <StaysCard rent={items.rent} rooms={items.rooms} guests={items.guests} pic={items.pic} beds={items.beds} email={items.postedBy} city={items.city} state={items.state} address={items.address} />
                        </Link>
                    )
                })}
            </div>
        )
        else if(this.props.searchList.length>0){
        return(
            <div className='Stays' >
                <h1>Stays</h1>
                <h5>Searching For {this.props.searchList[0]['beds'] ? <span>{this.props.searchList[0]["beds"]}{" "}Beds,</span>:null} {this.props.searchList[0]['guests'] ? <span>{this.props.searchList[0]['guests']}{" "} Guests </span>: null} {" "} in {this.props.searchList[0]['location'] ? <span>{this.props.searchList[0]['location']}{" "}</span>: null} </h5> 
                {this.props.stays.filter(item=>(item.beds >= Number(this.props.searchList[0]['beds']) && item.guests >= this.props.searchList[0]['guests'] && (item.address === this.props.searchList[0]['location'].toLowerCase() || item.city === this.props.searchList[0]['location'].toLowerCase() || item.state === this.props.searchList[0]['location'].toLowerCase())))
                .map((items,index)=>{
                    console.log(items)
                    return(
                        <Link key={index} to={'/details/' + index} >
                        <StaysCard rent={items.rent} rooms={items.rooms} guests={items.guests} pic={items.pic} beds={items.beds} email={items.postedBy} city={items.city} state={items.state} address={items.address} />
                        </Link>
                    )
                })}
            </div>
        )
    }
}
}
const mapStateToProps = (state)=>(
    {
        stays: state.reducer.stays,
        updateMenu: state.reducer.updateMenu,
        searchList: state.reducer.searching
    }
)
const mapDispatchToProps = (dispatch)=>({
    searching: (data)=>dispatch({type: 'searching', payload: data})
})
export default connect(mapStateToProps,mapDispatchToProps)(Stays);

class StaysCard extends Component
{
    render(){
        return(
            <div className='StaysCard'>
                <table>
                    <tbody>
                        <tr>
                            <td className='stayimage' rowSpan='6'>
                                <img src={this.props.pic[0]} alt='' />
                            </td>
                        </tr>
                        <tr>
                            <td><h2>Rooms: {this.props.rooms}</h2></td>
                        </tr>
                        <tr>
                            <td><h2>Beds: {this.props.beds}</h2></td>
                        </tr>
                        <tr>
                            <td><h2>Guests: {this.props.guests}</h2></td>
                        </tr>
                        <tr>
                            <td><h2>Address: {this.props.address}, {this.props.city}, {this.props.state} </h2></td>
                        </tr>
                        <tr>
                            <td><h2>Rent: {this.props.rent} </h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}