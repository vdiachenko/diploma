import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { checkToken } from '../../ac'
import { userSelector } from '../../selectors'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import Home from '../Home'
import Auth from '../Auth'
import Tests from '../Tests'
import Account from '../Account'
import CreateUser from '../CreateUser'
import SVMRTest, { SVMRManual, SVMRSettings } from '../SVMR'
import SchulteTest, {
    SchulteManual,
    SchulteResults,
    SchulteSettings,
} from '../Schulte'
import Survey from '../Survey'
import styles from './app.module.css'

function App({ user, checkToken }) {
    useEffect(() => {
        checkToken()
    }, [checkToken])

    return (
        <div className={styles.wrapper}>
            <Switch>
                <Route path="/user/create" component={CreateUser} />
                <Route path="/tests/svmr" component={SVMRTest} exact />
                <Route path="/tests/svmr/manual" component={SVMRManual} exact />
                <Route
                    path="/tests/svmr/settings"
                    component={SVMRSettings}
                    exact
                />
                <Route path="/tests/schulte" component={SchulteTest} exact />
                <Route
                    path="/tests/schulte/manual"
                    component={SchulteManual}
                    exact
                />
                <Route
                    path="/tests/schulte/settings"
                    component={SchulteSettings}
                    exact
                />
                <Route
                    path="/tests/schulte/result"
                    component={SchulteResults}
                    exact
                />
                <PrivateRoute
                    path="/tests"
                    component={Tests}
                    user={user}
                    exact
                />
                <Route path="/survey/:id" component={Survey} exact />
                <Route path="/account" component={Account} exact />
                <Route path="/auth" component={Auth} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    )
}

export default connect(
    state => ({
        user: userSelector(state),
    }),
    {
        checkToken,
    }
)(App)
