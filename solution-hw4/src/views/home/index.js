import { Component } from 'react';
import NavBar from './navBar';
import RollCard from './rollCard';

// Create Homepage
class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rollCardData: [
        {
          imageURL: "assets/products/original-cinnamon-roll.jpg",
          rollName: "Original Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 2.49,
          totalPrice: 2.49
        },
        {
          imageURL: "assets/products/apple-cinnamon-roll.jpg",
          rollName: "Apple Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 3.49,
          totalPrice: 3.49
        },
        {
          imageURL: "assets/products/raisin-cinnamon-roll.jpg",
          rollName: "Raisin Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          rollName:"Chocolate Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL: "assets/products/walnut-cinnamon-roll.jpg",
          rollName: "Walnut Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL: "assets/products/gluten-free-cinnamon-roll.jpg",
          rollName: "Gluten Free Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: 1,
          actualQuantity: 1,
          price: 4.75,
          totalPrice: 4.75
        },
      ],  

      navBarData: {
          cartQuantity: 0,
          cartTotal: 0.00,
      },
      
      popUpData:{
        showPopup: false,
        productName: null,
        glazingType: null,
        packSize: null,
        price: null,
      },


    }
  }

  // Place Holder Functions
  handleGlazingChange = (event, index) => {
    const glazing = parseFloat(event.target.value);
    const glazingName = event.target.options[event.target.selectedIndex].text;
    
    console.log(glazingName);

    const newPrice = (this.state.rollCardData[index].price+ glazing) * this.state.rollCardData[index].quantitySelection;
    const updatedRollCardData = [...this.state.rollCardData];

    updatedRollCardData[index].glazingSelection = glazing;
    updatedRollCardData[index].totalPrice = newPrice;
    updatedRollCardData[index].glazingName = glazingName;
    
    this.setState({ 
      rollCardData: updatedRollCardData 
    });
  }
  
  handleQuantityChange = (event, index) => {
    const quantityDict = {1: 1, 3: 3, 5: 6, 10: 12};
    const quantity = parseInt(event.target.value);
    const actualQuantity = quantityDict[quantity];
    const newPrice = (this.state.rollCardData[index].price+ this.state.rollCardData[index].glazingSelection) *  quantity;
    const updatedRollCardData = [...this.state.rollCardData];

    updatedRollCardData[index].totalPrice = newPrice;
    updatedRollCardData[index].quantitySelection = quantity;
    updatedRollCardData[index].actualQuantity = actualQuantity;

    this.setState({ 
      rollCardData: updatedRollCardData 
    });
  }

  cartButtonHandler = (index) => {

    const updatedNavBarData = this.state.navBarData;
    const priceToAdd = this.state.rollCardData[index].totalPrice;

    updatedNavBarData.cartTotal += priceToAdd;
    updatedNavBarData.cartQuantity += 1;

    this.setState({ 
      navBarData: updatedNavBarData,
      popUpData: {
        showPopup: true,
        productName: this.state.rollCardData[index].rollName,
        glazingType: this.state.rollCardData[index].glazingName,
        packSize: this.state.rollCardData[index].actualQuantity,
        price: priceToAdd.toFixed(2),
      },
    });

    setTimeout(() => {
      this.setState({ 
        popUpData: {
          showPopup: false,
          productName: null,
          glazingType: null,
          packSize: null,
          price: null,
        },
      });
    }, 3000); 

  };

  render() {
    return (
      
    <div className="Home">

      {/* Create NavBar */}
      <NavBar 
        cartQuantity={this.state.navBarData.cartQuantity}
        cartTotal={this.state.navBarData.cartTotal}
      />

      {/* conditional pop-up */}
      {this.state.popUpData.showPopup && (
        <div className="pop-up" id="pop-up">
            <p className="pop-up-line" id="added-to-cart-pop">Added to Cart:</p>
            <p className="pop-up-line" id="cart-product-name-pop">{this.state.popUpData.productName}</p>
            <p className="pop-up-line" id="cart-glazing-type-pop">{this.state.popUpData.glazingType} Glazing</p>
            <p className="pop-up-line" id="cart-quantity-pop">Pack of {this.state.popUpData.packSize}</p>
            <p className="pop-up-line" id="cart-price-pop">Price: ${this.state.popUpData.price} </p>
        </div>
      )}

      <div className='body-content'>
        <div className='product-grid'>

          {/* Create RollCards */}
          {this.state.rollCardData.map((rollCard, idx) => {
              return <RollCard 
                key={idx} 
                rollIndex={idx}
                imageURL={rollCard.imageURL}
                rollName={rollCard.rollName}
                glazingSelection={rollCard.glazingSelection}
                quantitySelection={rollCard.quantitySelection}
                price={rollCard.price}
                totalPrice={rollCard.totalPrice}
                glazingChange={this.handleGlazingChange}
                quantityChange={this.handleQuantityChange}
                cartAdd={this.cartButtonHandler}/>;
              }
            )}

        </div>
      </div>
      
    </div>
  );
  }
}

export default HomePage;