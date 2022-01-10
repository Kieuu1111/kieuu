import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { NavLink, RouteComponentProps, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppState } from '../../reducer';
import { getAllProducts, deleteEntity, getEntity } from '../../reducer/productReducer';
import { getAllCategories } from '../../reducer/categoryReducer';
import { IndexedObject } from '../../utils/type';
import { CssBaseline } from '@material-ui/core';
import { Container } from 'reactstrap';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TProduct } from '../../models/product_model';
import ReactPaginate from 'react-paginate';
import MainListItems from './Navbar';

export interface IPropsType extends StateProps, DispatchProps, RouteComponentProps<IndexedObject> {}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // content which is class of main needs to be flex and column direction
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  // added the footer class
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
    // just this item, push to bottom
    alignSelf: 'flex-end',
  },
}));

const ProductListPage: React.FC<IPropsType> = (props) => {
  //UI
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Logic
  useEffect(() => {
    props.getAllProducts();
  }, []);

  const confirmDelete = (id: number) => {
    const conf = window.confirm('Are you sure you want to delete?');
    if (conf) {
      props.deleteEntity(id);
    }
  };

  const { products, categories } = props;

  // Categories
  useEffect(() => {
    props.getAllCategories();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = products
    .sort((a, b) => b.id - a.id)
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product: TProduct) => {
      const idtoName = categories.filter((val: any) => val.id == product?.categoryId);
      return (
        <TableRow key={product?.id}>
          <TableCell>{products.indexOf(product) + 1}</TableCell>
          <TableCell>
            <img className="product-img" src={product?.url1} alt="" />
          </TableCell>
          <TableCell>{product?.name}</TableCell>
          <TableCell>${product?.price}</TableCell>
          <TableCell>{idtoName[0]?.name}</TableCell>
          <TableCell>{product?.qty}</TableCell>
          <TableCell align="right">
            <Button
              style={{ marginRight: '2px' }}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon style={{ marginLeft: '0.5em' }} />}
              onClick={() => confirmDelete(product.id)}
            ></Button>
            <NavLink
              style={{ color: '#FFF', textDecoration: 'none' }}
              to={`admin/product/edit/${product.id}`}
            >
              <Button
                color="primary"
                variant="contained"
                startIcon={<EditIcon style={{ marginLeft: '0.5em' }} />}
              ></Button>
            </NavLink>
          </TableCell>
        </TableRow>
      );
    });

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected = 1 }) => {
    setPageNumber(selected);
  };

  return (
    <div className="photo-main">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Product management
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems></MainListItems>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className="mx-1">
                    <Button
                      className="btn px-3 "
                      variant="outlined"
                      color="primary"
                      startIcon={<AddCircleIcon />}
                    >
                      <NavLink to="/admin/product/add"> Add new product</NavLink>
                    </Button>
                  </div>
                  <Table size="medium">
                    <TableHead className="list">
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{displayProducts}</TableBody>
                  </Table>
                </Paper>
                <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'paginationBttns'}
                  previousLinkClassName={'previousBttn'}
                  nextLinkClassName={'nextBttn'}
                  disabledClassName={'paginationDisabled'}
                  activeClassName={'paginationActive'}
                  pageRangeDisplayed={10}
                  marginPagesDisplayed={10}
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: AppState) => ({
  products: storeState.product.entities,
  categories: storeState.category.entities,
});

const mapDispatchToProps = {
  getAllProducts,
  deleteEntity,
  getAllCategories,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
