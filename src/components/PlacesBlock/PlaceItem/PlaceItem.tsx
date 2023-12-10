import './PlaceItem.scss';
import {useRef, useEffect} from 'react';
import gsap, { Expo } from 'gsap';

function PlaceItem (props: any) {

    // // Bg Animation Logic

    const placeItemRef = useRef<HTMLDivElement>(null);
    const placeItemBgRef = useRef<HTMLDivElement>(null);

    const mouseOverButton = () => {
        placeItemBgRef.current!.style.transform = `translateY(-70%)`;
        placeItemBgRef.current!.style.opacity = '1';
        placeItemBgRef.current!.style.transition = 'transform 0.4s ease-in-out';
    };

    const mouseOutButton = () => {
        placeItemBgRef.current!.style.transform = `translateY(-140%)`;

        setTimeout(() => {
            placeItemBgRef.current!.style.transform = `translateY(0%)`;
            placeItemBgRef.current!.style.opacity = '0';
            placeItemBgRef.current!.style.transition = 'transform 0s linear';
        }, 400);
    };

    useEffect(() => {
        let placeItemButton = placeItemRef.current;
        
        if (window.innerWidth > 850) {
            placeItemButton!.addEventListener('mouseover', mouseOverButton);
            placeItemButton!.addEventListener('mouseleave', mouseOutButton);
        }

        return () => {
            placeItemButton!.removeEventListener('mouseover', mouseOverButton);
            placeItemButton!.removeEventListener('mouseleave', mouseOutButton);
        };
    }, []);

    // Photo Animation Logic

    const photoBlockRefs = useRef<Array<HTMLDivElement | null>>([]);
    const photoBlockHoverRefs = useRef<Array<HTMLDivElement | null>>([]);
    const photoBlockInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
    const photoRefs = useRef<Array<HTMLImageElement | null>>([]);

    const indexRef = useRef(0);

    const requestRef = useRef<number | null>(null);

    const position = useRef({ top: 0, left: 0 });

    const xRef = useRef(null);
    const yRef = useRef(null);

    const leftRef = useRef<number | null>(null);
    const topRef = useRef<number | null>(null);

    const delay = 10;

    const moveImage = (index : number, e : any) => {        
        const { clientX, clientY } = e;
        const { top, left } = photoBlockRefs.current[index]!.getBoundingClientRect();

        xRef.current = clientX;
        yRef.current = clientY;

        topRef.current = top;
        leftRef.current = left;

        indexRef.current = index;
    };

    const animateImage = () => {

        position.current.top += ((yRef.current! - topRef.current!) - position.current.top) / delay;
        position.current.left += ((xRef.current! - leftRef.current!) - position.current.left) / delay;

        photoBlockHoverRefs.current[indexRef.current]!.style.top = `${position.current.top}px`;
        photoBlockHoverRefs.current[indexRef.current]!.style.left = `${position.current.left}px`;

        requestRef.current = requestAnimationFrame(animateImage);
    };

    const showImage = (index: number) => {
        gsap.killTweensOf(photoBlockHoverRefs.current[index]);
        gsap.killTweensOf(photoBlockInnerRefs.current[index]);
        gsap.killTweensOf(photoRefs.current[index]);
        gsap.killTweensOf(photoBlockRefs.current[index]);

        gsap.set(photoBlockRefs.current[index], {zIndex: 100});

        gsap.fromTo(
            photoBlockRefs.current[index], 
            {overflow: 'hidden'}, 
            {
                ease: Expo.easeOut,
                duration: 0,
                overflow: 'visible'
            }
        );

        gsap.fromTo(
            photoBlockHoverRefs.current[index], 
            {opacity: 0}, 
            {
                ease: Expo.easeOut,
                duration: 0,
                opacity: 1
            }
        );

        gsap.fromTo(
            photoBlockInnerRefs.current[index], 
            {
                x: '50%',
                y: '120%',
                rotation: 50
            }, 
            {
                ease: Expo.easeOut,
                duration: 0.4,
                x: '0%',
                y: '0%',
                rotation: 0
            }
        );

        gsap.fromTo(
            photoRefs.current[index], 
            {
                x: '50%',
                y: '120%',
                rotation: -50
            }, 
            {
                ease: Expo.easeOut,
                duration: 0.4,
                x: '0%',
                y: '0%',
                rotation: 0
            }
        );

        gsap.fromTo(
            photoRefs.current[index], 
            {
                scale: 2
            }, 
            {
                ease: Expo.easeOut,
                duration: 0.6,
                scale: 1
            }
        );
    };

    const hideImage = (index: number) => {
        gsap.killTweensOf(photoBlockHoverRefs.current[index]);
        gsap.killTweensOf(photoBlockInnerRefs.current[index]);
        gsap.killTweensOf(photoRefs.current[index]);
        gsap.killTweensOf(photoBlockRefs.current[index]);

        gsap.set(photoBlockRefs.current[index], {zIndex: 99});

        gsap.fromTo(
            photoBlockRefs.current[index], 
            {overflow: 'visible'}, 
            {
                ease: Expo.easeOut,
                duration: 0.1,
                delay: 0.9,
                overflow: 'hidden'
            }
        );

        gsap.fromTo(
            photoBlockHoverRefs.current[index], 
            {opacity: 1}, 
            {
                ease: Expo.easeOut,
                duration: 0.1,
                delay: 0.9,
                opacity: 0
            }
        );

        gsap.fromTo(
            photoBlockInnerRefs.current[index], 
            {
                x: '0%',
                y: '0%',
                rotation: 0
            }, 
            {
                ease: Expo.easeOut,
                duration: 0.9,
                y: '-120%',
                rotation: -5
            }
        );

        gsap.fromTo(
            photoRefs.current[index], 
            {
                y: '0%',
                rotation: 0,
                scale: 1
            }, 
            {
                ease: Expo.easeOut,
                duration: 1,
                y: '120%',
                rotation: 5,
                scale: 1.2
            }
        );
    };
    
    useEffect(() => {
        const addEventListeners = () => {
            photoBlockRefs.current.forEach((photoBlock, index) => {
            if (photoBlock && window.innerWidth > 850) {
                photoBlock.addEventListener('mouseover', () => showImage(index));
                photoBlock.addEventListener('mouseleave', () => hideImage(index));
                photoBlock.addEventListener('mousemove', (e) => moveImage(index, e));
            }
            });
        };

        addEventListeners();
        animateImage();

        const removeEventListeners = () => {
            photoBlockRefs.current.forEach((photoBlock, index) => {
            if (photoBlock) {
                photoBlock.removeEventListener('mouseover', () => showImage(index));
                photoBlock.removeEventListener('mouseleave', () => hideImage(index));
                photoBlock.removeEventListener('mousemove', (e) => moveImage(index, e));
            }
            });
        };

        return () => {
            removeEventListeners();
            cancelAnimationFrame(requestRef.current as number);
        };
    });
    
    
    return (
        <div 
            className='place-item-wrapper'
            ref={placeItemRef}
        >
            <div className='place-item' >
                <span className='place-item-number'>{props.number.toString().padStart(2, '0')}</span>
                <span className='place-item-text'>{props.country}</span>
                <div 
                    className='place-item-bg' 
                    ref={placeItemBgRef}
                ></div>
            </div>

            {
                props.photos.map((photo : any, index : any) => (
                    <div 
                        key={index} 
                        className={`place-item-photo-container ${index === 0 ? 'first' : 'second'}`}
                    >
                        <div 
                            className={`place-item-photo-container-inner ${index === 0 ? 'first' : 'second'}`}
                            ref={(el) => (photoBlockRefs.current[index] = el)}
                        >
                            <div 
                                className='hover-reveal'
                                ref={(el) => (photoBlockHoverRefs.current[index] = el)}
                            >
                                <div 
                                    className='hover-reveal-inner'
                                    ref={(el) => (photoBlockInnerRefs.current[index] = el)}
                                > 
                                    <img 
                                        src={photo}
                                        alt={props.country}
                                        ref={(el) => (photoRefs.current[index] = el)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default PlaceItem;

    