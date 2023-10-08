import React, { Component } from 'react';
import CartCard from './cartCard';

// Create NavBar Component
class CartDisplay extends Component {

  render() {
    return (
    // Create nav bar
      <section className="cart">
        <hr className="nav-break"/>

        {this.props.cartQuantity > 0 ? (
          <div className='cart-data'>
            <div className="cart-preview"> 
              {/* Pull in cart data passed by index.js */}
              <p className="cart-quantity" id="cart-quantity">Shopping Cart ({this.props.cartQuantity} Item{this.props.cartQuantity > 1 && 's'})</p>
              <p className="cart-total" id="cart-total">Total: ${this.props.cartTotal.toFixed(2)}</p>
            </div>
            <section className="cart-section">
              <section className="cart-grid">
                {this.props.cartItems.map((cartItem, index) => {
                  return <CartCard 
                    key={index}
                    index={index}
                    productImage={cartItem.productImage}
                    productName={cartItem.name}
                    glazingType={cartItem.glazing}
                    packSize={cartItem.quantity}
                    price={cartItem.price.toFixed(2)}
                    removeHandler={ this.props.removeHandler}
                  />;
                }
                )}
              </section>
            </section>
          </div>
        ) : (
          <h1>The cart is empty!</h1>
        )
        }
        <hr className="nav-break"/>
      </section>
    );
  }
}

export default CartDisplay