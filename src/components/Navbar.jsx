
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { FaArchive} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa";
import { FaCartArrowDown} from "react-icons/fa";



const NavBar = () => {

const navigate=useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token =localStorage.getItem('token')
        
        if(token){
            setShow(true)
        }else{
            //redireccion al login
            navigate('/login')
        }
        }

    return (
       <div>
         <Navbar bg="primar" variant="dark">
            <Container >
                <Navbar.Brand as={ Link } to="/" >E-commerce</Navbar.Brand>

                <Nav className="me-aut">
                    <Nav.Link as={ Link } to="/login" style={{marginRight:'50px'}}><FaUserAlt/></Nav.Link>
                    <Nav.Link as={ Link } to="/favorites" style={{marginRight:'50px'}}><FaArchive/></Nav.Link>
                    <Nav.Link onClick={handleShow} ><FaCartArrowDown/></Nav.Link>
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