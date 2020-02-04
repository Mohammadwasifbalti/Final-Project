import React, { Component } from 'react';
import Home from './Components/Home';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HostingHome from './Components/Host A Home/hostingHome';
import AllListings from './Components/Listings/All Listings/AllListings';
import SpecificListing from './Components/Listings/Specific Listings/specificListing';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Header/Navbar/Navbar';
import EditListing from './Components/Listings/Edit Listing/EditListing';
import Stay from './Components/Stays/stay';
import StayDetail from './Components/StayDetail/StayDetail';
import { isStatus } from './Store/middleware/middleware'

class App extends Component {
//   UNSAFE_componentWillMount(){
//     firebase.auth().onAuthStateChanged(user=>{
//       if(user){
//         this.props.authChange(user);
//         console.log("user found")
//       }
//       else
//       this.props.authChange(false)
//     })
//       let time = setInterval(() => {
//       if(this.props.isLogedin.email && this.props.temp){
//       let profilePic = db.collection("User").doc(this.props.isLogedin.email);
//       profilePic.get().then((data)=>{
//         if(data){
//           this.props.addData(data.data())
//         }
//         else
//         this.props.addData({name: '', email: '', pic: ''})
//         let Listings = [];
//         profilePic.collection('Your Listings').get().then((querySnapshot)=>{
//           let len = querySnapshot.docs.length;
//           querySnapshot.forEach((data)=>{  
//             db.collection('Hostings').doc(data.data().id)
//               .get().then((data)=>{
//                 Listings.push(data.data());
//                 this.props.addListing(Listings);
//                 this.props.updateMenu(Date.now())
//               })
//           })
//           if(len === 0){
//             this.props.addListing(Listings);
//             this.props.updateMenu(Date.now())
//           }
//           clearInterval(time)
//         })
//       })
//     }
//     }, 2000);
//   }
//   componentDidMount(){
//     let temp = setInterval(() => {    
//     if(this.props.isLogedin.email && this.props.temp){
//     clearInterval(temp)
//     let StayListings = []
//     db.collection('Hostings').get().then((querySnapshot)=>{
//       let length = querySnapshot.docs.length;
//       querySnapshot.forEach((data)=>{
//         db.collection('Hostings').doc(data.data().id)
//         .get().then((items)=>{
//           StayListings.push(items.data());
//             this.props.stays(StayListings);
//             this.props.updateMenu(Date.now())
//         })
//       })
//       if(length === 0){
//         this.props.stays(StayListings);
//         this.props.updateMenu(Date.now())
//       }
//     })
//   }
//   }, 1000);

// }
  UNSAFE_componentWillMount(){
    this.props.status()
  }
  render() {
    console.log(this.props.signUpStatus)
    return (
      <div className="App">
        <Router>  
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/hostahome" component={HostingHome} />
            <Route exact path="/listings" component={AllListings} />
            <Route path='/listings/:id' component={SpecificListing} />
            <Route path='/editlisting/:id' component={EditListing} />
            <Route path='/stays' component={Stay} />
            <Route path='/details/:id' component={StayDetail} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=> {
  return{
    // authChange: (user)=>dispatch({type: 'authChanged', payload: user}),
    // addData: (data)=>dispatch({type: 'dataFromFirestore' , payload: data}),
    // addListing: (data)=>dispatch({type: 'addListing', payload: data}),
    // updateMenu: (data)=>dispatch({type: 'updateMenu', payload: data}),
    // stays: (data)=>dispatch({type: 'stays', payload: data}),
    status: (signUpStatus)=>dispatch(isStatus(signUpStatus))
  }
}
export default connect(null, mapDispatchToProps)(App);
