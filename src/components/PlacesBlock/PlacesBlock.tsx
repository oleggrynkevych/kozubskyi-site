import './PlacesBlock.scss';
import placesData from './places-data';
import PlaceItem from './PlaceItem/PlaceItem';
import {useState, useEffect, useRef} from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

function PlacesBlock (props : any) {
    const isMobile = useMediaQuery('(max-width: 700px)');

    const [offsetY, setOffsetY] = useState(0);
    const placesBlockTitleRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [offsetY]);

    return (
        <section className='places-block' id='locations'>
            <div className='places-block-container'>
                <h2 
                    ref={placesBlockTitleRef}
                    style={{ marginTop: !isMobile ? `${offsetY * 0.2}px` : '0px' }}
                >PLACES WHERE MEMORIES WERE captured...</h2>

                <div className='places-block-info-box'>
                    {
                        placesData.map((place, index) => (
                            <PlaceItem
                                key={place.id}
                                country={place.place}
                                number={place.id}
                                photos={place.photos}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
};

export default PlacesBlock;