import React, { Component } from 'react';

// Create RollCard Component 
class RollCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          totalPrice: this.props.totalPrice,
        };  
    } 

    render() {
        return (
            // <!-- Create div for individual product lising -->
            this.props.show && (
            <div className="product-listing" id="product-1">
                <img className="product-photo" src={this.props.imageURL} alt='product' width={250}/>
                <div className="product-data">
                    <h2 className="product-label">{this.props.rollName}</h2>
                    <div className="product-glazing">
                        <p className="select-tag">Glazing:</p>
                        {/*Create drop down for glazing options */}
                        <span className="selector" >
                            <select className="glazing-list" onChange={(e) => this.props.glazingChange(e, this.props.rollIndex)} id="glazing1">
                                <option value="0" data-name="Original">Keep Original</option>
                                <option value="0" data-name="Sugar Milk">Sugar Milk</option>
                                <option value="0.5" data-name="Vanilla Milk">Vanilla Milk</option>
                                <option value="1.5" data-name="Double Chocolate">Double Chocolate</option>
                            </select>
                        </span>
                    </div>
                    <div className="product-quantity">
                        <p className="select-tag">Pack Size:</p>
                        {/* Radio for quantity */}
                        <form className="selector " onChange={(e) => this.props.quantityChange(e, this.props.rollIndex)}>
                            <input type="radio" id={`quantity1${this.props.rollIndex}`} name='item-quantity' value="1" />
                                {/* conditional styling for radio labels */}
                                <label htmlFor={`quantity1${this.props.rollIndex}`} style={{background: this.props.quantitySelection === 1 ? 'LightGray' : 'white'}}>1</label> 
                            <input type="radio" id={`quantity3${this.props.rollIndex}`} name='item-quantity' value="3" />
                                <label htmlFor={`quantity3${this.props.rollIndex}`} style={{background: this.props.quantitySelection === 3 ? 'LightGray' : 'white'}}>3</label>
                            <input type="radio" id={`quantity6${this.props.rollIndex}`} name='item-quantity' value="5" />
                                <label htmlFor={`quantity6${this.props.rollIndex}`} style={{background: this.props.quantitySelection === 5 ? 'LightGray' : 'white'}}>6</label>
                            <input type="radio" id={`quantity12${this.props.rollIndex}`} name='item-quantity' value="10" />
                                <label htmlFor={`quantity12${this.props.rollIndex}`} style={{background: this.props.quantitySelection === 10 ? 'LightGray' : 'white'}}>12</label>
                        </form>
                    </div>
                    {/* Price and add to cart */}
                    <div className="to-cart">
                        <p className="select-tag">${this.props.totalPrice.toFixed(2)}</p>
                        <button className="cart-add" onClick={(e) => this.props.cartAdd(this.props.rollIndex)} >ADD TO CART</button>
                    </div>
                </div>
            </div>
            )
            
    );
  }
}

export default RollCard