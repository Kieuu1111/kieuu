import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { TProduct } from '../../models/product_model';

type TProps = {
  listProduct: TProduct[];
};
const initialValue = [
  { id: 0, name: '', category: '', categoryId: 0, price: 0, des: '', qty: 0, url1: '', url2: '' },
];
const apiProducts = 'https://test-heroku444.herokuapp.com/products1';

const HomeList = (props: TProps) => {
  const [products, setProducts] = useState(initialValue);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(apiProducts, { params });
        // console.log('response', response);
        setProducts(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };

    fetchProductList();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products
    .sort((a, b) => b.id - a.id)
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((post: TProduct) => {
      return (
        <div key={post.id} className="col-md-3 col-sm-6">
          <div className="single-product">
            <div className="product-upper">
              <img src={post.url1} alt="" />
            </div>
            <div className="product-name ${post.id}">
              <Link to={'/details/' + post.id}>{post.name}</Link>
            </div>
            <span>${post.price}</span>
            <div className="product-option">
              <a className="add_to_cart_button" href="/home">
                Add to cart
              </a>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected = 1 }) => {
    setPageNumber(selected);
  };

  return (
    <div className="row">
      {displayProducts}
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
    </div>
  );
};

export default HomeList;
function params(params: any) {
  throw new Error('Function not implemented.');
}
