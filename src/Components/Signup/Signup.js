import React, {Component} from 'react';
import './signup.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import {SignUp} from '../../Store/middleware/middleware'

class Signup extends Component
{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            pass: '',
            pic: false,
            loaded: false,
            loader: 'none'
        }
    }
    onChange(e){
        if(e.target.id !== 'pic')
        this.setState({[e.target.id]: e.target.value});
        else
        {   
            this.setState({[e.target.id]: e.target.files[0], picfield: e.target})
        }
    }
    onSubmit(e){
        e.preventDefault();

        if(this.state.email !== '' && this.state.pass !== '' && this.state.name !=='' && this.state.pic)
        {
            let email = this.state.email;
            let pass = this.state.pass;
            let name = this.state.name;
            let pic = this.state.pic
            this.setState({loader: 'block', loaded: true})
            console.log(pass)
            this.props.signUp(email, name, pass, pic)
        }
    else
        this.props.SignUpStatus('Please fill all the Fields');
    }
    UNSAFE_componentWillReceiveProps()
    {
        if(this.state.loader !== 'none')
        this.setState({loader: 'none'})
    }

    render(){
        console.log(this.props.signUpStatus)
        if(this.props.isLogedin ==='notloaded'){
            return <div></div>
        }
        if(this.props.isLogedin || (this.props.isLogedin && this.props.signUpStatus === 'Success')){
            console.log(this.props.signUpStatus);
            return <Redirect to='/' />
        }
        else
        {
        return(
            <div className="Signup">
                <div className='loader' style={{display: this.state.loader}}><i className="fa fa-refresh fa-spin"></i></div>
                <div className="signUp">
                    <h1>Sign Up</h1>
                    <form>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td >
                                            <label htmlFor="name">Name <span className="star">*</span></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'>
                                        <input value={this.state.name} type="text" placeholder='Full Name' id="name" onChange={(e)=>this.onChange(e)} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <label htmlFor="email">Email <span className="star">*</span></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'>
                                        <input value={this.state.email} placeholder='Email' type="email" id="email" onChange={(e)=>this.onChange(e)} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <label htmlFor="pass">Password <span className="star">*</span></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'>
                                        <input value={this.state.pass} type="password" id="pass" placeholder='Password' onChange={(e)=>this.onChange(e)} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <label htmlFor="pass">Add Photo <span className="star">*</span></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'>
                                            <input ref='file' type="file" accept='image/*' id="pic" onChange={(e)=>this.onChange(e)} required />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {(this.props.signUpStatus && this.props.signUpStatus !== 'Success' && this.props.signUpStatus !== "process" ? 
                            <div id="error" >{this.props.signUpStatus} </div> : null)}
                            <div className="center"><button id='signup' onClick={(e)=>this.onSubmit(e)} >Sign Up</button></div>
                            <div className="center">Already have an account ? <Link to='/signin'>Sign in</Link></div>

                        </div>
                    </form>
                </div>
            </div>
        )
        }
    }
}
const mapStateToProps = (state)=>(
    {
        isLogedin: state.authReducer.auth,
        signUpStatus: state.authReducer.signUpStatus
    }
)
const mapDispatchToProps = (dispatch)=>({
    temporary: (user)=>dispatch({type : 'temporary', payload : user }),
    signUp: (email,name,pass,pic)=>dispatch(SignUp(email,name,pass,pic)),
    SignUpStatus: (para)=>dispatch({type: 'signUpStatus', payload: para})
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
