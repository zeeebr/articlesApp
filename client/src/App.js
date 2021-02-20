import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './hooks/auth'
import { AuthContext } from './context/AuthContext'
import { NavBar } from './components/NavBar'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
    return (
      <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
        <Router>
          { isAuthenticated && <NavBar /> }
          <Container fluid>
            <Row className="mt-3">
              {routes} 
            </Row>
          </Container>
        </Router>
      </AuthContext.Provider>
      
    )
}

export default App
