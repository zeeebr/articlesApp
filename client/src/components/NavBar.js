import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Navbar, Nav, Button } from 'react-bootstrap'


export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>ArticlesApp</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/main">Main</Nav.Link>
                    <Nav.Link as={NavLink} to="/affil">Affiliations</Nav.Link>
                    <Nav.Link as={NavLink} to="/author">Authors</Nav.Link>
                    <Nav.Link as={NavLink} to="/article">Articles</Nav.Link>
                </Nav>
                <Button variant="primary" onClick={logoutHandler}>Log out</Button>
            </Navbar>
        </>
    )
}