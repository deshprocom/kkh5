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
import MallPage from '../page/mall/MallPage';
import LoadApp from '../page/LoadApp';
import InviteLoad from '../page/InviteLoad';
import InfoPage from '../page/InfoPage';
import ArticlePage from "../page/ArticlePage";
import InfoCategeryPage from "../page/info/InfoCategeryPage";
import FastFoodPage from "../page/fastBtn/FastFoodPage";
import ActivityInfoPage from "../page/ActivityInfoPage";

const RouteConfig = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={'/products/:id'} component={MallInfoPage}/>
                <Route path={'/loadApp'} component={LoadApp}/>
                <Route path={'/invite_load'} component={InviteLoad}/>
                <Route path={'/infos/:id'} component={InfoPage}/>
                <Route path={'/topics/:id'} component={ArticlePage}/>
                <Route path={'/info_types/:type/infos'} component={InfoCategeryPage}/>
                <Route path={'/hotlines'} component={FastFoodPage}/>
                <Route path={'/activities/:id'} component={ActivityInfoPage}/>
            </Switch>
        </App>
    </Router>
);

export default RouteConfig