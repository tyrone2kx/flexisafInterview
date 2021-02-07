import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Question1 from '../screens/Question1';
import NotFoundScreen from '../screens/NotFoundScreen';
import Question2 from '../screens/Question2';
import Question3 from '../screens/Question3';

export const History = createHistory();



const AppRouter = () => (
    <Router history={History}>
        <div>
            <Switch>
                <Route path="/" component={Question1} exact={true} />
                <Route path="/Q2" component={Question2} />
                <Route path="/Q3" component={Question3} />


                <Route component={NotFoundScreen} />
            </Switch>
        </div>
    </Router>
);


export default AppRouter;