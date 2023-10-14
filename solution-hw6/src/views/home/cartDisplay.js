import React, { Component } from 'react';
import CartCard from './cartCard';

// Create NavBar Component
class CartDisplay extends Component {

  getCartTotal = () =>{
    let total = 0;
    for(const item of this.props.cartItems){
      total += item.price;
    }
    return total
  }

  render() {
    return (
    // Create nav bar
      <section className="cart">
        <hr className="nav-break"/>

        {this.props.cartItems.length > 0 ? (
          <div className='cart-data'>
            <div className="cart-preview"> 
              {/* Pull in cart data passed by indez.js */}
              <p className="cart-quantity" id="cart-quantity">Shopping Cart ({this.props.cartItems.length} Item{this.props.cartItems.length > 1 && 's'})</p>
              <p className="cart-total" id="cart-total">Total: ${this.getCartTotal().toFixed(2)}</p>
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