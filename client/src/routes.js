import { Switch, Route, Redirect } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Correction } from './pages/Correction'
import { Author } from './pages/Author'
import { Affil } from './pages/Affil'
import { Main } from './pages/Main'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path='/main' component={Main} exact />
                <Route path='/affil' component={Affil} exact />
                <Route path='/author' component={Author} exact />
                <Route path='/correction' component={Correction} exact />

                <Redirect to='/main' />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path='/' exact>
                <Auth />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}