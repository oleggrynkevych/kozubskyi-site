import './LoadingPage.scss';
import Logo from '../Header/Logo';
import { useEffect, useRef } from 'react';


function LoadingPage(props : any) {

    const loadingPageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(props.isVideoReady) {
            loadingPageRef.current!.style.animation = 'logoPageHide 2s forwards';
        }
    }, [props.isVideoReady]);


    return (
        <div className='loading-page' ref={loadingPageRef}>
            <div className='loading-logo-container'>
                <Logo/>
            </div>
        </div>
    )
};

export default LoadingPage;