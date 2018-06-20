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

const RouteConfig = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={'/mall_info/:id'} component={MallInfoPage}/>
            </Switch>
        </App>
    </Router>
);

export default RouteConfig