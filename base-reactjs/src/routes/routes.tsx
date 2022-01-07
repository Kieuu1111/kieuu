import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { IndexedObject } from '../utils/type';
import PrivateRoute from './private-route';
import PublicRoute from './publicRoute';
import NoMatch from '../components/no_match';
import RegisterPage from '../components/register';
import LoginPage from '../components/login';
import HomePage from '../components/User/HomePage';
import Details from '../components/User/Details';
import ProductList from '../components/Admin/ProductList';
import CategoryList from '../components/Admin/CategoryList';
import CategoryAddEdit from '../components/Admin/ProductActionpage/CategoryAddEdit';
import ProductAddEdit from '../components/Admin/ProductActionpage/ProductAddEdit';

const Routes: React.FC<IndexedObject> = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/details/:id" component={Details} />
    <PublicRoute exact path="/login" component={LoginPage} />

    <PublicRoute exact path="/admin/category" component={CategoryList} />
    <PublicRoute exact path="/admin/category/add" component={CategoryAddEdit} />
    <PublicRoute exact path="/admin/category/edit/:id" component={CategoryAddEdit} />

    <PublicRoute exact path="/admin/product" component={ProductList} />
    <PublicRoute exact path="/admin/product/add" component={ProductAddEdit} />
    <PublicRoute exact path="/admin/product/edit/:id" component={ProductAddEdit} />

    <PublicRoute exact path="/admin" component={ProductList} />
    <PublicRoute exact path="/register" component={RegisterPage} />
    <PrivateRoute exact path="/admin" component={ProductList} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
