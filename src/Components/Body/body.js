import React, {Component} from 'react'
import ExploreAirbnb from './Explore Airbnb/ExploreAirbnb'
import Video from './Videopart/Video'
import Recomended from './RecomendedForYou/Recomended'

class Body extends Component
{
    render(){
        return(
            <div className="Body">
                <ExploreAirbnb />
                <Video />
                <Recomended />
            </div>
        )
    }
}
export default Body;