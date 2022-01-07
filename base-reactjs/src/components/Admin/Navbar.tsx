import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

export const mainListItems = (
  <div>
    <Link className="nav-link" to="/home">
      <ListItemIcon>
        <HomeIcon color="primary" />
      </ListItemIcon>
      HomePage
    </Link>
    <Link className="nav-link" to="/admin">
      <ListItemIcon>
        <DashboardIcon color="primary" />
      </ListItemIcon>
      Products
    </Link>
    <Link className="nav-link" to="/admin/category">
      <ListItemIcon>
        <ShoppingCartIcon color="primary" />
      </ListItemIcon>
      Categories
    </Link>
  </div>
);
