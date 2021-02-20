import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper teal darken-1" style={{ padding: '0 2rem' }}>
            <span className="brand-logo">ArticlesApp</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/main">Monitoring</NavLink></li>
                <li><NavLink to="/import">Import</NavLink></li>
                <li><NavLink to="/author">Authors</NavLink></li>
                <li><NavLink to="/correction">Correction</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Log out</a></li>
            </ul>
            </div>
        </nav>
    )
}