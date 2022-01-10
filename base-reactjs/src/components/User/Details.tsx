import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { TProduct } from '../../models/product_model';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<TProduct>();
  const initialValue = [{ id: 0, name: '' }];
  const [categories, setCategories] = useState(initialValue);
  // console.log('categories', categories);

  const idtoName = categories.filter((val: any) => val.id == product?.categoryId);
  // console.log('idtoName', idtoName);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://test-heroku444.herokuapp.com/products1/${id}`);
        setProducts(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    // console.log('ádasdadasd');
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://test-heroku444.herokuapp.com/categories1/');
        setCategories(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div key={product?.id} className="detail container px-lg-5">
        <div className="row mx-lg-n5 frameDetail">
          <div className="col py-3 px-lg-5 ">
            <div className="subNav">
              <a className="subNavText" href="/">
                Home
              </a>
              /
              <a className="subNavText" href="/">
                {idtoName[0]?.name}
              </a>
              /
              <a className="subNavText" href="/">
                {product?.name}
              </a>
            </div>
            <img className="imgPramary" src={product?.url1} alt="" />
            <div>
              <img className="imgItem" src={product?.url2} alt="" />
            </div>
          </div>
          <div className="col py-3 px-lg-5 ">
            <div>
              <h1 className="productName">{product?.name}</h1>
            </div>
            <div>
              <p className="productPrice">${product?.price}</p>
            </div>
            <form action="home" className="cart">
              <div className="quantity">
                <input
                  type="number"
                  size={4}
                  className="input-text qty text "
                  title="Qty"
                  defaultValue={1}
                  name="quantity"
                  min={1}
                  step={1}
                />
              </div>
              <button className="add_to_cart_button" type="submit">
                ADD TO CART
              </button>
            </form>
            <div className="select">
              <p>
                Category:
                <a className="selectLink" href="#">
                  {idtoName[0]?.name}
                </a>
                Tags:
                <a className="selectLink" href="home">
                  awesome
                </a>
                ,
                <a className="selectLink" href="home">
                  best
                </a>
                ,
                <a className="selectLink" href="home">
                  sale
                </a>
                ,
                <a className="selectLink" href="home">
                  shoes.
                </a>
              </p>
            </div>
            <ul className="product-tab" role="tablist">
              <li role="presentation" className="active">
                <a
                  className="presentationText"
                  href="#home"
                  aria-controls="home"
                  role="tab"
                  data-toggle="tab"
                >
                  Description
                </a>
              </li>
              <li role="presentation">
                <a
                  className="presentationText"
                  href="#profile"
                  aria-controls="profile"
                  role="tab"
                  data-toggle="tab"
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div className="contentProduct">
              <h1 className="descriptionText">Product Description</h1>
              <p className="textContentProduct">{product?.des}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Details;
function params(params: any) {
  throw new Error('Function not implemented.');
}
