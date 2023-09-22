import React, { Component } from 'react';

// Create RollCard Component 
class RollCard extends Component {
  render() {
    return (
    // <!-- Create div for individual product lising -->
        <div className="product-listing" id="product-1">
            <img className="product-photo" src={this.props.imageURL} alt='product' width={250}/>
            <div className="product-data">
                <h2 className="product-label">{this.props.rollName}</h2>
                <div className="product-glazing">
                    <p className="select-tag">Glazing:</p>
                    {/*Create drop down for glazing options */}
                    <span className="selector">
                    <select className="glazing-list" id="glazing1">
                    <option value="keep-original">Keep Original</option>
                    <option value="sugar-milk">Sugar Milk</option>
                    <option value="vanilla-milk">Vanilla Milk</option>
                    <option value="double-chocolate">Double Chocolate</option>
                    </select>
                    </span>
                </div>
                <div className="product-quantity">
                    <p2 className="select-tag">Pack Size:</p2>
                    {/* Radio for quantity */}
                    <form className="selector ">
                        <input type="radio" id={`quantity1${this.props.rollIndex}`} name='item-quantity' value="1" /><label for={`quantity1${this.props.rollIndex}`}>1</label>
                        <input type="radio" id={`quantity3${this.props.rollIndex}`} name='item-quantity' value="3" /><label for={`quantity3${this.props.rollIndex}`}>3</label>
                        <input type="radio" id={`quantity6${this.props.rollIndex}`} name='item-quantity' value="5" /><label for={`quantity6${this.props.rollIndex}`}>6</label>
                        <input type="radio" id={`quantity12${this.props.rollIndex}`} name='item-quantity' value="10" /><label for={`quantity12${this.props.rollIndex}`}>12</label>
                    </form>
                </div>
                {/* Price and add to cart */}
                <div className="to-cart">
                    <p className="select-tag">${this.props.totalPrice}</p>
                    <button className="cart-add">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
  }
}

export default RollCard