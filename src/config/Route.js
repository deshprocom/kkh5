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
import Info from '../page/Info'

const RouteConfig = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={'/info'} component={Info}/>
            </Switch>
        </App>
    </Router>
);

export default RouteConfig