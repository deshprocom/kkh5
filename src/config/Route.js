/**
 * Route.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */

import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import MallInfoPage from '../page/mall/MallInfoPage';
import LoadApp from '../page/LoadApp';

const RouteConfig = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={'/products/:id'} component={MallInfoPage}/>
                <Route path={'/loadApp'} component={LoadApp}/>
                <Route path={'/products/:id/loadApp'} component={LoadApp}/>
            </Switch>
        </App>
    </Router>
);

export default RouteConfig