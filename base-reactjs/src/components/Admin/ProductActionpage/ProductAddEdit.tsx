import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { defaultProductValue, TProduct } from '../../../models/product_model';
import { AppState } from '../../../reducer';
import { getAllCategories } from '../../../reducer/categoryReducer';
import { createEntity, getEntity, reset, updateEntity } from '../../../reducer/productReducer';

export interface IProductCreatedProps extends StateProps, DispatchProps, RouteComponentProps {
  id: string;
}

const ProductAddEdit = (props: IProductCreatedProps) => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const { product, updateSuccess, categories } = props;

  const [productView, setProductView] = useState<TProduct>(defaultProductValue);

  const [isValidate, setIsValidate] = useState(true);
  useEffect(() => {
    // neu co id => goi api
    if (Number(id) != 0) {
      props.getEntity(id);
    }
  }, []);

  useEffect(() => {
    console.log('product', product);

    if (updateSuccess) {
      history.push('/admin/product');
    }

    if (product && product.id) {
      setProductView(product);
    }
  }, [updateSuccess, product]);

  const saveEntity = async (e: any) => {
    e.preventDefault();

    // console.log(productView);
    if (productView?.id !== 0) {
      window.confirm('Are you sure you want to edit this product?');
      props.updateEntity(productView);
    } else {
      window.confirm('Are you sure you want to add new product?');
      props.createEntity(productView);
    }
  };

  const handleInputChange = (event: any) => {
    console.log(event.target.value);
    setProductView((prevProps: any) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = () => {
    if (productView?.categoryId === 0) {
      setIsValidate(false);
      return false;
    }
  };

  useEffect(() => {
    props.getAllCategories();
  }, []);

  const onChangeSellect = (event: any) => {
    if (event.target.value !== 0) {
      setIsValidate(true);
    }
    setProductView((prevProps: any) => ({
      ...prevProps,
      categoryId: event.target.value,
    }));
  };

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={6} md={4}>
        <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <ValidatorForm onSubmit={saveEntity} onError={(errors) => console.log(errors)}>
            <TextValidator
              style={{ marginBottom: '20px' }}
              label="Product Name"
              name="name"
              fullWidth
              value={productView?.name}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />

            <TextValidator
              style={{ marginBottom: '20px' }}
              label="Price"
              name="price"
              fullWidth
              value={productView?.price}
              onChange={handleInputChange}
              validators={['minNumber:0']}
              errorMessages={['Price is not valid']}
            />
            <TextValidator
              style={{ marginBottom: '20px' }}
              label="Quantity"
              name="qty"
              fullWidth
              value={productView?.qty}
              onChange={handleInputChange}
              validators={['minNumber:0']}
              errorMessages={['Quantity is not valid']}
            />
            <TextValidator
              style={{ marginBottom: '20px' }}
              label="Product Description"
              name="des"
              fullWidth
              value={productView?.des}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <FormControl fullWidth margin="normal" error={!isValidate}>
              <InputLabel>Category Name</InputLabel>
              <Select
                displayEmpty
                name="categoryId"
                labelId="categoryId"
                id="categoryId"
                value={productView?.categoryId}
                onChange={onChangeSellect}
              >
                {categories?.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.id}>
                      {' '}
                      {option.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {!isValidate && <FormHelperText>Select a category</FormHelperText>}
            </FormControl>
            <TextValidator
              style={{ marginTop: '20px', marginBottom: '20px' }}
              label="Product Primary Image"
              name="url1"
              fullWidth
              value={productView?.url1}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              label="Other Image"
              name="url2"
              fullWidth
              value={productView?.url2}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <FormControl fullWidth margin="normal">
              <div className="wrapButton">
                <Button variant="success" type="submit" onClick={handleClick}>
                  {product?.id == 0 ? 'Add new product ' : 'Update your product'}
                </Button>{' '}
                <Button variant="danger" type="submit">
                  <NavLink style={{ color: '#FFF', textDecoration: 'none' }} to="/admin">
                    CANCEL
                  </NavLink>
                </Button>
              </div>
            </FormControl>
          </ValidatorForm>
        </Paper>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (appState: AppState) => ({
  products: appState.product.entities,
  updating: appState.product.updating,
  updateSuccess: appState.product.updateSuccess,
  loading: appState.product.loading,
  product: appState.product.entity,
  categories: appState.category.entities,
});

const mapDispatchToProps = {
  createEntity,
  updateEntity,
  getEntity,
  reset,
  getAllCategories,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddEdit);
