import './PortfolioBlock.scss';
import portfolioData from './portfolio-data';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import {useState, useLayoutEffect, useRef} from 'react';

function PortfolioBlock (props : any) {
    const [offsetY, setOffsetY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    
    const portfolioBlockRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => setOffsetY(window.scrollY);

    const updateWindowHeight = () => setWindowHeight(window.innerHeight);
    
    useLayoutEffect(() => {
        updateWindowHeight();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateWindowHeight);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateWindowHeight);
        }
    }, [offsetY]);

    useLayoutEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    return (
        <section 
            className='portfolio-block' 
            ref={portfolioBlockRef}
            id='portfolio'
        >
            <div className='portfolio-block-container'>
                <h2 
                    style={{
                        top: `${window.innerWidth > 700 ? windowHeight / 2 : null}px`, 
                        marginTop: `${window.innerWidth > 700 ? windowHeight / 2 : null}px`,
                        marginBottom: `${window.innerWidth > 700 ? windowHeight / 2 : null}px`,
                    }}
                > PORTFOLIO </h2>


                {portfolioData.map((item, index) => (
                    <PortfolioItem 
                        key={item.id}
                        id={item.id}
                        url={item.video}
                        text={item.text}
                        photo={item.photo}
                        offsetY={offsetY}
                        setMutedVW={props.setMutedVW}
                    />
                ))}
            </div>
        </section>
    )
};

export default PortfolioBlock;