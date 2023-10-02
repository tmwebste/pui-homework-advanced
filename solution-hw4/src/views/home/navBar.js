import React, { Component } from 'react';

// Create NavBar Component
class NavBar extends Component {

  render() {
    return (
    // Create nav bar
      <nav className="top">

          <div className="nav-left">
              <img src="assets/logo/logo-01.svg" alt="" width="300" />
          </div>
          <div className="nav-right">
              <div className="page-nav">

                  {/* <!-- Links go to dummy page --> */}
                  <a className="page-link" href="./otherpage.html">PRODUCTS</a>
                  <a className="page-link" href="./otherpage.html">CART</a>

              </div>
              <div className="cart-preview"> 
                  {/* Pull in cart data passed by indez.js */}
                  <p className="cart-detail" id="cart-quantity">{this.props.cartQuantity} Items</p>
                  <p className="cart-detail" id="cart-total">Total: ${this.props.cartTotal.toFixed(2)}</p>
              </div>

              <hr className="nav-break"/>
              <h1 className="product-header">Our Hand-Made Cinnamon Rolls</h1>
          </div>

      </nav>
    );
  }
}

export default NavBar