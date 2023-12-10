import './WelcomeBlock.scss';
import { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import arrowDown from '../../assets/arrow-down.svg';
import WelcomeVideo from './WelcomeVideo/WelcomeVideo';
import classNames from 'classnames';
import { Link } from 'react-scroll';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import videoBgMP4 from '../../assets/videoBg.mp4';
import videoBgWEBM from '../../assets/videoBg.webm';


declare global {
    interface IVideoElement {
        requestFullscreen() : void;
        webkitRequestFullscreen() : void;
        webkitEnterFullscreen() : void;
        msRequestFullscreen() : void;
        mozRequestFullScreen() : void;
        exitFullscreen() : void;
        mozCancelFullScreen() : void;
        webkitExitFullscreen() : void;
        style : any;
        addEventListener : any;
        removeEventListener : any;
        offsetHeight : any;
    }
}

declare global {
    interface Document {
        mozCancelFullScreen? : () => Promise<void>;
        msExitFullscreen? : () => Promise<void>;
        webkitExitFullscreen? : () => Promise<void>;
        mozFullScreenElement? : Element;
        msFullscreenElement? : Element;
        webkitFullscreenElement? : Element;
    }
}

// Cloudinary Videos

// const cld = new Cloudinary({
//     cloud: {
//         cloudName: 'drqz2ewro'
//     }
// });

function WelcomeBlock (props: any) {
    const isMobile = useMediaQuery('(max-width: 850px)');
    const [isFullScreen, setFullSreen] = useState(false);

    const welcomeBlockRef = useRef<HTMLDivElement>(null);
    const welcomeVideoRef = useRef<IVideoElement>(null);
    const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
    const fullscreenButtonTextRef = useRef<HTMLDivElement>(null);

    // Set Height Of Welcome Block

    useEffect(() => {
        if (welcomeBlockRef.current) {
            props.setWelcomeBlockHeight(welcomeBlockRef.current.offsetHeight);
        }
    }, [props]);


    // Mute And FullScreen Logic

    const handleClickMute = () => {
       props.setMuted(!props.isMuted);
    }

    const enterFullScreen = () => {
        const elem = welcomeVideoRef.current!;

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
            welcomeVideoRef.current!.style.zIndex = '2000';
            welcomeVideoRef.current!.style.backgroundColor = 'grey';
            welcomeVideoRef.current!.style.width = '100%';
            welcomeVideoRef.current!.style.height = '100dvh';
            document.body.style.overflow = 'hidden';
        } else {
            enterFullScreen();
        };

        welcomeVideoRef.current!.style.visibility = 'visible';
        setFullSreen(true);
        props.setMuted(false);
    }

    const handleFullScreenChange = () => {
        welcomeVideoRef.current!.style.zIndex = '-2';
        welcomeVideoRef.current!.style.backgroundColor = 'transparent';
        welcomeVideoRef.current!.style.width = '100px';
        welcomeVideoRef.current!.style.height = '100px';
        welcomeVideoRef.current!.style.visibility = 'hidden';
        document.body.style.overflow = 'unset';

        setFullSreen(false);
        props.setMuted(true);

        if(window.innerWidth > 850) {
            exitFullscreen();
        };
    }


    // Check Video Playing

    const checkVideoReady = () => {
        props.setVideoReady(true);
    };


    // FullScreen Button -> Magnet Effect

    const mouseOverButton = (e : any) => {
        const position = fullscreenButtonRef.current!.getBoundingClientRect();

        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        fullscreenButtonRef.current!.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
        fullscreenButtonTextRef.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        fullscreenButtonTextRef.current!.style.transition = `transform 0.3s ease`;
        fullscreenButtonRef.current!.style.transition = `transform 0.3s linear`;
    };

    const mouseOutButton = () => {
        fullscreenButtonRef.current!.style.transform = `translate(0px, 0px)`;
        fullscreenButtonTextRef.current!.style.transform = `translate(0px, 0px)`;
        fullscreenButtonTextRef.current!.style.transition = `transform 0.5s ease-in-out`;
        fullscreenButtonRef.current!.style.transition = `transform 0.3s ease-in-out`;
    };

    useEffect(() => {
        let fullscreenButton = fullscreenButtonRef.current;

        // const videoElement = document.getElementById('myVideo') as HTMLVideoElement;
        // videoElement.play();       
        
        if (window.innerWidth > 850) {
            fullscreenButton!.addEventListener('mousemove', mouseOverButton);
            fullscreenButton!.addEventListener('mouseout', mouseOutButton);

            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    setFullSreen(false);
                };
            });
        };

        return () => {
            fullscreenButton!.removeEventListener('mousemove', mouseOverButton);
            fullscreenButton!.removeEventListener('mouseout', mouseOutButton);

            document.removeEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    setFullSreen(false);
                }
            });
        };
    }, []);


    // Styles

    const soundOnClasses = classNames('welcome-block-sound-on-button', {
        muted: !props.isMuted
    });

    const soundOffClasses = classNames('welcome-block-sound-off-button', {
        muted: props.isMuted
    });

    return (
        <div 
            className='welcome-block'
            ref={welcomeBlockRef}
        >
            <video autoPlay loop muted playsInline controls={false} id="myVideo" className='background-video' onPlay={checkVideoReady}> 
                {/* <source src={`${process.env.PUBLIC_URL}/video/videoBg.webm`} type='video/webm'></source>
                <source src={`${process.env.PUBLIC_URL}/video/videoBg.mp4`} type='video/mp4'></source>  */}
                
                <source src={videoBgWEBM} type='video/webm'></source>
                <source src={videoBgMP4} type='video/mp4'></source>
            </video> 

        

            {/* <AdvancedVideo
                className='background-video'
                autoPlay={true}
                muted={true}
                loop={true}
                onPlay={checkVideoReady}
                cldVid={cld.video('videoBg_ckapsi').quality('auto')}
            /> */}
            
            <WelcomeVideo 
                muted={props.isMuted}
                fullScreen={isFullScreen}
                ref={welcomeVideoRef}
                handleFullScreenChange={handleFullScreenChange}
            />

            <div className={soundOnClasses} onClick={handleClickMute}>
                <div className='stroke-container'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className='welcome-block-sound-button-text'>sound on</span>
            </div>

            <div className={soundOffClasses} onClick={handleClickMute}>
                <div className='stroke-container'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className='welcome-block-sound-button-text'>sound off</span>
            </div>

            <div className='welcome-block-container'>
                <button 
                    className='welcome-block-fullscreen-button'
                    onClick={handleFullScreen}
                    ref={fullscreenButtonRef}
                >
                    <span ref={fullscreenButtonTextRef}>SHOWREEL</span>
                </button>

                <Link smooth spy to={'portfolio'}>
                    <div className='welcome-block-scroll-button'>
                        <span>portfolio</span>
                        <img src={arrowDown} alt={'Arrow Down'}/>
                    </div>
                </Link>

                <span className='welcome-block-main-text-1'>destination</span>
                <span className='welcome-block-main-text-2'>wedding</span>
                <span className='welcome-block-main-text-3'>filmmaker</span>
                <span className='welcome-block-description-text'>create timeless cinematic memories of your best day</span>
            </div>
        </div>
    )
};

export default WelcomeBlock;