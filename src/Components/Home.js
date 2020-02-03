import React, {Component} from 'react';
import Header from './Header/header';
import Body from './Body/body';


class Home extends Component
{
    render(){
        return(
            <div className="Home" style={{paddingBottom: '6vw'}} >
                <Header />
                <Body />
            </div>
        )
    }
}
export default Home