import './Footer.scss';

function Footer () {
    return (
        <footer className='footer' id='contacts'>
            <div className='footer-container'>
                <div className='footer-main'>
                    <span className='footer-title'>LEt your day stay cinematic</span>
                    <div className='footer-info'>
                        <span className='footer-info-label'>email</span>
                        <a href='mailto: VOVKAKOZUBSKYY@GMAIL.COM'>
                            <span className='footer-info-link mail'>VOVKAKOZUBSKYY@GMAIL.COM</span>
                        </a>
                        <span className='footer-info-label'>instagram</span>
                        <a href='https://www.instagram.com/vovka_kozubskyi/?hl=uk' target='_blank' rel="noreferrer">
                            <span className='footer-info-link instagram'>VOVKA_KOZUBSKYI</span>
                        </a>

                        <div className='footer-description'>
                            <div className='footer-person'>
                                <div></div>
                                <h3>VOVKA KOZUBSKYI</h3>
                            </div>

                            <p>big experience of working in fashion industry, with magazines and clothing brands, that’s why my works are all about beauty, style and fashionable esthetics.</p>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <span>©KOZUBSKYI, 2023</span>
                    <a href='https://www.instagram.com/vania_gun/?hl=uk' target='_blank' rel="noreferrer">
                        <span className='footer-dev-link'>design & DEv by Ivan Vergun</span>
                    </a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;