import React, {Component} from 'react'
import up from './up.png'
import down from './download.png'
import './searchForm.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class SearchForm extends Component{
    constructor(){
        super();
        this.state = {
            location: '',
            guestsValue: "Guests",
            guestsbackground: down,
            displaydropdown: "none",
            adults: 0,
            beds: '',
            children: 0,
            infants: 0,
            adultslessopacity: 0.5,
            adultsmoreopacity: 1,
            childrenlessopacity: 0.5,
            childrenmoreopacity: 1,
            infantslessopacity: 0.5,
            infantsmoreopacity: 1,
            redirect: false
        }
    }
    onLocationChange(e){
        let value = e.target.value;
        this.setState({[e.target.id]: value});
    }
    guests(){
        if(this.state.guestsbackground===down){
            this.setState({
                guestsbackground: up,
                displaydropdown: "block"
            })
        }
        else{
            this.setState({
                guestsbackground: down,
                displaydropdown: "none"
            })
        }
    }
    decrement(e){
        e.preventDefault();
        if(this.state[e.target.id]>0){
            if((e.target.id === "adults") && this.state.adults === 1 && (this.state.children >0 || this.state.infants >0)){
                this.setState({adultslessopacity: 0.5})
            }
            else if((e.target.id === "adults") && this.state.adults === 2 && (this.state.children >0 || this.state.infants >0)){
                this.setState({
                    [e.target.id]: --this.state[e.target.id],
                    adultslessopacity : 0.5
                })
            }
            else{
            this.setState({
                [e.target.id]: --this.state[e.target.id],
            })
        }
        }
        if(this.state[e.target.id]===0){
            this.setState({[e.target.id + "lessopacity"]: 0.5})
        }
        let total = this.state.children + this.state.adults;
        if(total<16){
            this.setState({adultsmoreopacity: 1,})
            if(this.state.children<5)
            {
                this.setState({childrenmoreopacity: 1})
            }
        }
        if(this.state.infants<5){
            this.setState({infantsmoreopacity: 1})
        }
        if(this.state.children === 0 && this.state.infants === 0 && this.state.adults === 1){
            this.setState({adultslessopacity: 1})
        }
        if(this.state.children + this.state.adults > 0 && this.state.infants > 0)
        {
            this.setState({guestsValue: this.state.children + this.state.adults + " guests, " + this.state.infants + " infants"})
        }
        else if(this.state.children + this.state.adults > 0 && this.state.infants === 0)
        {
            this.setState({guestsValue: this.state.children + this.state.adults + " guests"})
        }
        else{
            this.setState({guestsValue: "Guests"})
        }
    }
    increment(e){
        e.preventDefault();
        let total = this.state.adults + this.state.children;
        this.setState({[e.target.id + "lessopacity"] : 1})
        if(e.target.id === "adults"){
            if(total<16){
                this.setState({
                    [e.target.id]: ++this.state[e.target.id]
                })
            }
            else{
                this.setState({childrenmoreopacity: 0.5,
                                adultsmoreopacity: 0.5})
            }
        }
        else if(e.target.id === "children"){
            if(total<16 && this.state[e.target.id]<5){
                this.setState({
                    [e.target.id]: ++this.state[e.target.id]
                })
            }
            if(this.state[e.target.id] === 1 && this.state.adults === 0){
                this.setState({
                    adults: ++this.state.adults,
                    adultslessopacity: 0.5
                })
            }
            if(this.state[e.target.id] === 1 && this.state.adults === 1){
                this.setState({
                    adultslessopacity: 0.5
                })
            }
            if(this.state[e.target.id]===5){
                this.setState({childrenmoreopacity: 0.5})
            }
        }
        else if(e.target.id === "infants"){
            if(this.state[e.target.id]<5){
                this.setState({
                    [e.target.id]: ++this.state[e.target.id]
                })
            }
            if(this.state[e.target.id] === 1 && this.state.adults === 0){
                this.setState({
                    adults: ++this.state.adults,
                    adultslessopacity: 0.5
                })
            }
            if(this.state[e.target.id] === 1 && this.state.adults === 1){
                this.setState({
                    adultslessopacity: 0.5
                })
            }
            if(this.state[e.target.id]===5){
                this.setState({infantsmoreopacity: 0.5})
            }
        }
        if((this.state.children + this.state.adults) === 16){
            this.setState({
                adultsmoreopacity: 0.5,
                childrenmoreopacity: 0.5
            })
        }
        if(this.state.children + this.state.adults > 0 && this.state.infants > 0)
        {
            this.setState({guestsValue: this.state.children + this.state.adults + " guests, " + this.state.infants + " infants"})
        }
        else if(this.state.children + this.state.adults > 0 && this.state.infants === 0)
        {
            this.setState({guestsValue: this.state.children + this.state.adults + " guests"})
        }
        else{
            this.setState({guestsValue: "Guests"})
        }
    }
    onSave(){
        this.setState({displaydropdown: "none"})
    }
    onClear(){
        this.setState({
            adults: 0,
            children: 0,
            infants: 0,
            adultslessopacity: 0.5,
            childrenlessopacity: 0.5,
            infantslessopacity: 0.5,
            adultsmoreopacity: 1,
            childrenmoreopacity: 1,
            infantsmoreopacity: 1,
            guestsValue: "Guests"
        })
    }
    onSearch(e){
        e.preventDefault()
        let temp = [{
            guests: this.state.adults + this.state.children,
            beds: this.state.beds,
            location: this.state.location
        }]
        this.props.searching(temp)
        this.setState({redirect: true})
    }
    render(){
        if(this.state.redirect){
            return <Redirect to='/stays' />
        }
        return(
            <div className="SearchForm">
                <h1>Book unique places to stay and things to do.</h1>
                <form>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="location">where</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" value={this.state.location} onChange={(e)=>this.onLocationChange(e)} id="location" placeholder="Anywhere" />
                                    </td>
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <label htmlFor="beds">Beds</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input className="beds" onChange={(e)=>this.onLocationChange(e)} value={this.state.beds} type="number" id="beds" placeholder="Beds" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="guests">guests</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" id="guests" onChange={(e)=>this.onLocationChange(e)} value={this.state.guestsValue} onFocus={(e)=>e.target.blur()} onClick={()=>this.guests()} style={{opacity: 0.6, backgroundImage: `url(` + this.state.guestsbackground + `)`}} placeholder="Guests" />
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                                <div id="guestsDropdown" style={{display: this.state.displaydropdown}}>
                                    <div className="options" ><div className="left"><span className="headings">Adults</span><br/><span className="descrip">Above 12</span></div><div className="right"><button onClick={(e)=>this.decrement(e)} style={{opacity: this.state.adultslessopacity}} id="adults" className="controls less">-</button><span id="adults">{this.state.adults}+</span><button onClick={(e)=>this.increment(e)} style={{opacity: this.state.adultsmoreopacity}} id="adults" className="controls more">+</button></div><div className="clearBoth"></div></div>
                                    <div className="options" ><div className="left"><span className="headings">Children</span><br/><span className="descrip">Ages 2-12</span></div><div className="right"><button onClick={(e)=>this.decrement(e)} style={{opacity: this.state.childrenlessopacity}} id="children" className="controls less">-</button><span id="children">{this.state.children}+</span><button onClick={(e)=>this.increment(e)} style={{opacity: this.state.childrenmoreopacity}} id="children" className="controls more">+</button></div><div className="clearBoth"></div></div>
                                    <div className="options" ><div className="left"><span className="headings">Infants</span><br/><span className="descrip">Under 2</span></div><div className="right"><button onClick={(e)=>this.decrement(e)} style={{opacity: this.state.infantslessopacity}} id="infants" className="controls less">-</button><span id="infants">{this.state.infants}+</span><button onClick={(e)=>this.increment(e)} style={{opacity: this.state.infantsmoreopacity}} id="infants" className="controls more">+</button></div><div className="clearBoth"></div></div>
                                    <div className="options last"><div className="left"><span id="clear" onClick={()=>this.onClear()} >Clear</span></div> <div className="right1" ><span id="save" onClick={()=>this.onSave()} >Save</span></div><div className="clearBoth"></div></div>
                                </div>
                                <div><button onClick={(e)=>this.onSearch(e)} id="submit">Search</button></div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>({
    searching: (data)=>dispatch({type: 'searching', payload: data})
})
export default connect(null, mapDispatchToProps)(SearchForm);