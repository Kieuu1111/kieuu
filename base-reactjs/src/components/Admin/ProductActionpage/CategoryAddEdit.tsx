import * as React from 'react';
import { FormControl, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { defaultCateValue, TCategory } from '../../../models/category_model';
import { AppState } from '../../../reducer';
import { createEntity, updateEntity, getEntity, reset } from '../../../reducer/categoryReducer';
import { IndexedObject } from '../../../utils/type';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export interface IProductCreatedProps extends StateProps, DispatchProps, RouteComponentProps {
  id: string;
}

const CategoryAddEdit = (props: IndexedObject) => {
  const { id } = useParams<{ id: string }>();
  console.log('id ', id);

  const history = useHistory();
  const { category, updateSuccess } = props;

  const [categoryView, setCategoryView] = useState<TCategory>(defaultCateValue);

  useEffect(() => {
    if (Number(id) != 0) {
      props.getEntity(id);
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      history.push('/admin/category');
    }

    if (category && category.id) {
      setCategoryView(category);
    }
  }, [updateSuccess, category]);

  const saveEntity = async (e: any) => {
    e.preventDefault();

    // console.log(productView);
    if (categoryView?.id !== 0) {
      window.confirm('Are you sure you want to edit this category?');
      props.updateEntity(categoryView);
    } else {
      window.confirm('Are you sure you want to add new category?');
      props.createEntity(categoryView);
    }
  };

  const handleInputChange = (event: any) => {
    console.log(event.target.value);
    setCategoryView((prevProps: any) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={6} md={4}>
        <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <ValidatorForm onSubmit={saveEntity} onError={(errors) => console.log(errors)}>
            <TextValidator
              style={{ marginBottom: '20px' }}
              label="Categgory Name"
              name="name"
              fullWidth
              value={categoryView?.name}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <FormControl fullWidth margin="normal">
              <div className="wrapButton">
                <Button variant="success" type="submit">
                  {category?.id == 0 ? 'Add new product ' : 'Update your product'}
                </Button>{' '}
                <Button variant="danger" type="submit">
                  <NavLink style={{ color: '#FFF', textDecoration: 'none' }} to="/admin/category">
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
const mapStateToProps = (storeState: AppState) => ({
  updating: storeState.category.updating,
  category: storeState.category.entity,
  updateSuccess: storeState.category.updateSuccess,
  loading: storeState.category.loading,
});

const mapDispatchToProps = {
  createEntity,
  updateEntity,
  getEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddEdit);
