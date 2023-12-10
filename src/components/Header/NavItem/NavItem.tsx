import './NavItem.scss';
import { Link } from 'react-scroll';

function NavItem (props : any) {
    return (
        <Link smooth spy to={props.id} onClick={props.handleMenuClose}>
            <li>
                <span>{props.text}</span>
            </li>
        </Link>
    )
};

export default NavItem;