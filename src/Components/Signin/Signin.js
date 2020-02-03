import React, { Component } from 'react';
import './signin.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {signIn} from '../../Store/middleware/middleware';

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            isLogedin: false,
            error: '',
            errorDisplay: 'none',
            loader: 'none',
        }
    }
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ loader: 'block' })
        let email = this.state.email;
        let pass = this.state.pass;
        this.props.signIn(email,pass);
    }
    componentWillUnmount() {
        // this.props.addData()
        this.props.returnPage(false);
        // firebase.auth().onAuthStateChanged(user=>{
        //     if(user){
        //       this.props.authChange(user);
        //       console.log("user found")
        //        let time =  setInterval(() => {
        //         if(this.props.isLogedin.email){
        //             clearInterval(time)
        //         let profilePic = db.collection("User").doc(this.props.isLogedin.email);
        //         profilePic.get().then((data)=>{
        //           if(data){
        //             this.props.addData(data.data())
        //           }
        //           else
        //           this.props.addData({name: '', email: '', pic: ''})
        //         })
        //     }
        //       }, 3000);
        //     }
        //     else
        //     this.props.authChange(false)
        //   })
    }
    errorDisplay()
    {   
            if(this.state.error !== this.props.signInStatus)
            this.setState({ error: this.props.signInStatus, errorDisplay: 'block', loader: 'none' })
            else if(this.state.loader !== 'none')
            this.setState({loader: 'none'})
    }
    componentDidUpdate()
    {
        if(this.props.signInStatus)
        {
            this.errorDisplay();
            this.props.SignInStatus();
        }
    }
    render() {
        console.log(this.props.isLogedin)
        if (this.props.isLogedin === 'notloaded') {
            return <div></div>
        }
        else if (this.props.isLogedin && this.props.page) {
            return <Redirect to={'/' + this.props.page} />
        }
        else if (this.props.isLogedin && !this.props.page) {
            return <Redirect to='/' />
        }
        else if (this.props.isLogedin === false) {
            return (
                <div className="SigninPage" >
                    <div className='loader' style={{ display: this.state.loader }}><i className="fa fa-refresh fa-spin"></i></div>
                    <div className="signIn">
                        <h1>Sign In</h1>
                        <form>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td >
                                                <label htmlFor="email">Email <span className="star">*</span></label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2'>
                                                <input type="email" id="email" onChange={(e) => this.onChange(e)} placeholder='Email' required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <label htmlFor="pass">Password <span className="star">*</span></label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2'>
                                                <input type="password" id="pass" onChange={(e) => this.onChange(e)} placeholder='Password' required />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="error" style={{ display: this.state.errorDisplay }}>{this.state.error} </div>
                                <div className="center"><button id='signin' onClick={(e) => this.onSubmit(e)} >Sign In</button></div>
                                <div className="center">Create an account ? <Link to='/signup'>Sign up</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => (
    {
        isLogedin: state.authReducer.auth,
        page: state.authReducer.page,
        signInStatus: state.authReducer.signInStatus
    }
)
const mapDispatchToProps = (dispatch) => (
    {
        returnPage: (value) => dispatch({ type: 'pages', payload: value }),
        authChange: (user) => dispatch({ type: 'authChanged', payload: user }),
        addData: (data)=>dispatch({type: 'dataFromFirestore' , payload: data}),
        signIn: (email,pass)=>dispatch(signIn(email,pass)),
        SignInStatus: ()=>dispatch({type: 'signInStatus', payload: false})
        // addData: () => dispatch(Middleware.isStatus()),

    }
)
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
