import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Nav, Navbar,} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <Navbar className="container" bg="" expand="lg">
            <Navbar.Brand href="#home">
                <Link to="/home">
                    RAPID RIDERS
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link >
                    <Link to="/home">Home</Link>
                </Nav.Link>
                
                <Nav.Link >
                    <Link to="/destination">Destination</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link to="/contact">Contact</Link>
                </Nav.Link>
                {loggedInUser.name || loggedInUser.displayName ? 
                <Nav.Link onClick={() => setLoggedInUser({})}>
                Sign Out
                </Nav.Link>
                : 
                <Nav.Link>
                    <Link to="/login">Login</Link>
                </Nav.Link>}
                {loggedInUser.displayName || loggedInUser.name  && 
                <Nav.Link>
                    <Link to="">
                    {loggedInUser.name}{loggedInUser.displayName}
                    </Link>
                </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
       
    );
};

export default Header;