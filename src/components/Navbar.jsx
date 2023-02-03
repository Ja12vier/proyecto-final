
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { FaArchive} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa";
import { FaCartArrowDown} from "react-icons/fa";
const NavBar = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
       <div>
         <Navbar bg="primar" variant="dark">
            <Container >
                <Navbar.Brand as={ Link } to="/" >E-commerce</Navbar.Brand>

                <Nav className="me-aut">
                    <Nav.Link as={ Link } to="/login" style={{marginRight:'100px'}}><FaUserAlt/></Nav.Link>
                    <Nav.Link as={ Link } to="/favorites" style={{marginRight:'100px'}}><FaArchive/></Nav.Link>
                    <Nav.Link onClick={handleShow} style={{marginEnd:'20px'}}><FaCartArrowDown/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Sidebar
        show={show}
        handleClose={handleClose}
        />
       </div>
    )
}

export default NavBar;