import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  // const isProductDetail = location.pathname === '/product-details/1/Bonneville.html';
  const isHome = location.pathname === '/home';

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 header__logo">
            <a href="./home">
              <img src="https://freshdesignweb.com/demo/template/ustora/img/logo.png" alt="logo" />
            </a>
          </div>
        </div>
      </div>
      <div className="mainmenu-area">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className={`nav-item ${isHome ? 'active' : ''}`}>
                      <Link className="nav-link" to="/home">
                        Home
                      </Link>
                    </li>
                    {/* <li className={`nav-item ${isProductDetail ? 'active' : ''}`}>
                    <Link className="nav-link" to="/product-details/1/Bonneville.html">
                      product Details
                    </Link>
                  </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Checkout
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Others
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Contact
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        Admin
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
