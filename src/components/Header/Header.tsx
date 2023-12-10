import './Header.scss';
import Logo from './Logo';
import CloseIcon from '../../assets/close-icon.svg';
import OpenIcon from '../../assets/open-icon.svg';
import navData from './nav-data';
import NavItem from './NavItem/NavItem';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState, useEffect} from 'react';
import classNames from 'classnames';
import useScrollDirection from '../../hooks/useScrollDirection';

function Header (props : any) {

    const [openMenu, setOpenMenu] = useState(false);
    const [headerOpen, setHeaderOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 850px)');
    const scrollDirection = useScrollDirection();


    // Open/Close Menu Logic

    const handleMenuOpen = () => {
        if (isMobile) {
            setOpenMenu(true);
            setHeaderOpen(true);
        } 
    };

    const handleMenuClose = () => {
        if (isMobile) {
            setOpenMenu(false);

            setTimeout(() => {
                setHeaderOpen(false)
            }, 400);
        } 
    };

    useEffect(() => {
        if (openMenu) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [openMenu]);


    // MixBlendMode Logic For Header

    const [isOutWelcomeBlock, setOutWelcomeBlock] = useState(false);

    useEffect(() => {
        const handleWelcomeBlockScroll = () => {
            if (window.scrollY > props.welcomeBlockHeight - 30) {
                setOutWelcomeBlock(true);
            } else {
                setOutWelcomeBlock(false);
            }
        };

        window.addEventListener('scroll', handleWelcomeBlockScroll);

        return () => {
            window.removeEventListener('scroll', handleWelcomeBlockScroll);
        };
    }, [props.welcomeBlockHeight]);


    // Styles

    const headerStyles = classNames('header', {
        mixBlendMode: isOutWelcomeBlock,
        hide: scrollDirection === 'down',
        open: headerOpen
    });

    const openIconClasses = classNames('open-icon', {
        open: openMenu
    });

    const closeIconClasses = classNames('close-icon', {
        open: openMenu
    });

    const navigationClasses = classNames('header-navigation', {
        open: openMenu
    });

    const logoClasses = classNames('header-logo', {
        open: openMenu
    });


    return (
        <header className={headerStyles}>
            <div className='header-container'>
                <div className={logoClasses}>
                    <Logo />
                </div>

                <nav className={navigationClasses}>
                    <ul>
                        {
                            navData.map((item, index) => (
                                <NavItem
                                    key={index}
                                    text={item.text}
                                    id={item.id}
                                    handleMenuClose={handleMenuClose}
                                />
                            ))
                        }
                    </ul>
                </nav>

                <img className={openIconClasses} onClick={handleMenuOpen} src={OpenIcon} alt={'Open Menu Icon'}/>

                <img className={closeIconClasses} onClick={handleMenuClose} src={CloseIcon} alt={'Close Menu Icon'}/>
            </div>
        </header>
    )
};

export default Header;