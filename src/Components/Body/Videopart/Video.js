import React, {Component} from 'react'
import './Video.css'
import path from './video1.mp4'
import play from './play.png'
import pause from './pause.png'

class Video extends Component
{
    constructor(){
        super();
        this.state = {
            controlsSrc : pause
        }
    }
    videocontrols(){
        if(this.state.controlsSrc === pause)
        {
            this.refs.Vidref.pause();
            this.setState({controlsSrc: play})
        }
        if(this.state.controlsSrc === play)
        {
            this.refs.Vidref.play();
            this.setState({controlsSrc: pause})
        }
    }

    render(){
        return(
            <div className="Video">
                <div id="videodiv">
                    <video className="videoscr" ref="Vidref" controlsList="nodownload" muted crossOrigin="anonymous" loop={true} playsInline="" autoPlay preload="auto" style={{objectFit: "cover"}} >
                        <source className="mp4" src={path} type="video/mp4; codecs:hevc" />
                        <source className="mp4" src={path} type="video/mp4" />
                    </video>
                </div>
                <div id="controlsButton">
                    <img src={this.state.controlsSrc} onClick={()=>this.videocontrols()} height="35px" width="35px" alt="controls" />
                </div>
            </div>
          
          
        )
    }
}
export default Video;