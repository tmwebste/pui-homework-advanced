import React, { Component } from 'react';

// Create NavBar Component
class CartCard extends Component {

  render() {
    return (
    // Create nav bar
        <section className="cart-item">
            <div className='card-image'>
                <img className="cart-product-image" src={this.props.productImage}></img>
            </div>
            <div className="cart-product-data">
                <h1>{this.props.productName}</h1>
                <p>Glazing: {this.props.glazingType}</p>
                <p>Pack Size: {this.props.packSize}</p>
                <p>${this.props.price}</p>
                <button onClick={(e) => this.props.removeHandler(e, this.props.index)}>Remove</button>
            </div>
        </section>
    );
  }
}

export default CartCard