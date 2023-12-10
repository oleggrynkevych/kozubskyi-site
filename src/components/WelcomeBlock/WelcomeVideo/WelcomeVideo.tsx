import './WelcomeVideo.scss';
import ReactPlayer from 'react-player';
import React from 'react';
import CrossIcon from '../../../assets/cross-icon.svg';

const WelcomeVideo = React.forwardRef((props : any, ref : any) => {

    const WELCOME_VIDEO = 'https://vimeo.com/879873119';
    const WELCOME_VIDEO_MOBILE = 'https://vimeo.com/878415183';

    return(
        <div 
            className='welcome-video-container'
            ref={ref}
        >
            <div className='welcome-video-container-inner'>
                <img src={CrossIcon} alt={'Close Video Button'} onClick={props.handleFullScreenChange}/>

                <ReactPlayer
                    className='welcome-video'
                    url={window.innerWidth > 850 ? WELCOME_VIDEO : WELCOME_VIDEO_MOBILE}
                    controls={true}
                    loop={true}
                    playing={true}
                    playsinline={true}
                    volume={0.5}
                    muted={props.muted}
                    config={{ vimeo: { playerOptions: { transcript: false, pip: false, attributes: { 'webkit-playsinline': true} }}}}
                />
            </div>
            
        </div>
    )
});

export default WelcomeVideo;