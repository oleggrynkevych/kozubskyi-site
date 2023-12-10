import './PortfolioItem.scss';
import ReactPlayer from 'react-player';
import React, {useRef, useState, useLayoutEffect} from 'react';
import classNames from 'classnames';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import CrossIcon from '../../../assets/cross-icon.svg';


function PortfolioItem (props : any) {
    const isMobile = useMediaQuery('(max-width: 700px)');

    const [isFullScreen, setFullScreen] = useState(false);
    const videoRef = useRef<IVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoContainerInnerRef = useRef<HTMLDivElement>(null);

    const enterFullScreen = () => {
        const elem = videoRef.current!;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
            
        } else if (elem.webkitEnterFullscreen) {
            /* Safari */
            elem.webkitEnterFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
            
        } else if (elem.mozRequestFullScreen) {
            /* Mozila */
            elem.mozRequestFullScreen();
        };
    };

    function exitFullscreen() {
        const elem = document;

        if (elem.exitFullscreen) {
            elem.exitFullscreen();
            
        } else if (elem.mozCancelFullScreen) {
            elem.mozCancelFullScreen();
            
        } else if (elem.webkitExitFullscreen) {
            elem.webkitExitFullscreen(); 
        };
    };

    const handleFullScreen = () => {
        if (isMobile) {   
            videoRef.current!.style.backgroundColor = 'grey';
            videoRef.current!.style.width = '100%';
            videoRef.current!.style.height = '100%';
            document.body.style.overflow = 'hidden';
            videoContainerRef.current!.style.width = '100vw';
            videoContainerRef.current!.style.height = '100vh';
            videoContainerRef.current!.style.zIndex = '2000';
            videoContainerRef.current!.style.position = 'fixed';
            videoContainerRef.current!.style.top = '0';
            videoContainerRef.current!.style.left = '0';
            videoContainerInnerRef.current!.style.display = 'none';
        } else {
            props.setMutedVW(true);
            enterFullScreen();
        };
        
        setFullScreen(true);
    }

    const handleFullScreenClose = () => {
        if (isMobile) { 
            videoRef.current!.style.backgroundColor = 'transparent';
            videoRef.current!.style.width = '100px';
            videoRef.current!.style.height = '100px';
            document.body.style.overflow = 'unset';
            videoContainerRef.current!.style.width = '100%';
            videoContainerRef.current!.style.height = '216px';
            videoContainerRef.current!.style.zIndex = '2';
            videoContainerRef.current!.style.position = 'static';
            videoContainerRef.current!.style.top = 'unset';
            videoContainerRef.current!.style.left = 'unset';
            videoContainerInnerRef.current!.style.display = 'block';
        };

        setFullScreen(false);

        if(window.innerWidth > 850) {
            exitFullscreen();
        };
    }

    const handleFullScreenChange = () => {
        if (window.innerHeight !== videoRef.current!.offsetHeight) {
            setFullScreen(false);
        }
    }

    useLayoutEffect(() => {
        const currentVideoRef = videoRef.current;

        currentVideoRef!.addEventListener('fullscreenchange', handleFullScreenChange);
        currentVideoRef!.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    
        return () => {
            currentVideoRef!.removeEventListener('fullscreenchange', handleFullScreenChange);
            currentVideoRef!.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
        };
    }, []);


    // Styles

    const portfolioItemClasses = classNames('portfolio-item', {
        portfolio1: props.id === 1,
        portfolio2: props.id === 2,
        portfolio3: props.id === 3,
        portfolio4: props.id === 4,
        portfolio5: props.id === 5,
    });

    return (
        <div  
            className={portfolioItemClasses}
            ref={videoContainerRef}
            style={{transform: `translateY(${
                props.id === 1 && !isMobile ? props.offsetY * -0.3 : 
                props.id === 2 && !isMobile ? props.offsetY * -0.35 : 
                props.id === 3 && !isMobile ? props.offsetY * -0.5 :
                props.id === 4 && !isMobile ? props.offsetY * -0.3 : 
                props.id === 5 && !isMobile ? props.offsetY * -0.41 : 0
            }px)`}}
        >
            <div className='portfolio-item-video-container' ref={(videoRef as unknown) as React.RefObject<HTMLDivElement>}>
                <img src={CrossIcon} alt={'Close Video Button'} onClick={handleFullScreenClose}/>

                <ReactPlayer
                    className='portfolio-item-video'
                    url={props.url}
                    controls={true} 
                    loop={false}
                    playing={isFullScreen ? true : false}
                    playsinline={true}
                    volume={0.5}
                    muted={isFullScreen ? false : true}
                    config={{ vimeo: { playerOptions: { transcript: false, pip: false}}}}
                    onEnded={() => {
                        if(isFullScreen) {
                            handleFullScreenClose();
                        }
                    }}
                />
            </div>

            <div className='portfolio-item-container' ref={videoContainerInnerRef}>
                <div className='portfolio-item-button-container'>
                    <div className='portfolio-item-button' onClick={handleFullScreen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M4.18153 4.26135C4.18153 3.47019 5.05677 2.99235 5.72228 3.42017L13.373 8.33851C13.9853 8.73215 13.9853 9.62723 13.373 10.0209L5.72228 14.9392C5.05677 15.367 4.18153 14.8892 4.18153 14.098V4.26135Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                
                <img className='portfolio-item-photo' src={props.photo} alt={props.text}/>
            </div>

            <span className='portfolio-item-text'>{props.text}</span>
        </div>
    )
};

export default PortfolioItem;