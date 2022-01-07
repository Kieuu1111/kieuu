import * as React from 'react';
import { IndexedObject } from '../../utils/type';
import Footer from './footer';
import Header from './header';
import HomeList from './HomeList';

const HomePage: React.FC<IndexedObject> = () => {
  return (
    <>
      <Header />
      <div className="home-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>SHOP</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-area">
        <div className="container">
          <HomeList listProduct={[]} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
