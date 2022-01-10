import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import { logout } from '../../reducer/authenReducer';
import { AppState } from '../../reducer';
import { Button } from '@material-ui/core';

export interface IPropsType extends StateProps, DispatchProps {}

const mainListItems: React.FC<IPropsType> = (props) => {
  const handleLogout = () => {
    props.logout();
  };

  return (
    <div>
      <Link className="nav-link" to="/home">
        <ListItemIcon>
          <HomeIcon color="primary" />
        </ListItemIcon>
        HOMEPAGE
      </Link>
      <Link className="nav-link" to="/admin/product">
        <ListItemIcon>
          <DashboardIcon color="primary" />
        </ListItemIcon>
        PRODUCTS
      </Link>
      <Link className="nav-link" to="/admin/category">
        <ListItemIcon>
          <ShoppingCartIcon color="primary" />
        </ListItemIcon>
        CATGORIES
      </Link>
      <Button color="primary" style={{ marginLeft: '0.5em' }} onClick={handleLogout}>
        <ListItemIcon>
          <LayersIcon color="primary" />
        </ListItemIcon>
        Logout
      </Button>
    </div>
  );
};

const mapDispatchToProps = { logout };
const mapStateToProps = (storeState: AppState) => ({
  authen: storeState.authentication,
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(mainListItems);
