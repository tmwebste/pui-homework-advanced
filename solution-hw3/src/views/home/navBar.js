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
                  <p5 className="cart-datail" id="cart-quantity">{this.props.cartQuantity} Items</p5>
                  <p5 className="cart-datail" id="cart-total">Total: ${this.props.cartTotal.toFixed(2)}</p5>
              </div>

              <hr className="nav-break"/>
              <h1 className="product-header">Our Hand-Made Cinnamon Rolls</h1>
          </div>

          <div className="pop-up hide" id="pop-up">
              <p5 className="pop-up-line" id="added-to-cart-pop">Added to Cart: </p5>
              <p5 className="pop-up-line" id="cart-product-name-pop">Product Name</p5>
              <p5 className="pop-up-line" id="cart-glazing-type-pop">Glazing Type</p5>
              <p5 className="pop-up-line" id="cart-quantity-pop">Pack of</p5>
              <p5 className="pop-up-line" id="cart-price-pop">Price: </p5>
          </div>
      </nav>
    );
  }
}

export default NavBar