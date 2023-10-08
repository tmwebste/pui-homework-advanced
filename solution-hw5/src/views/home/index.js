import { Component } from 'react';
import NavBar from './navBar';
import RollCard from './rollCard';
import SearchBar from './searchBar';
import CartDisplay from './cartDisplay';

// Create Homepage
class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Set default state for each roll
      rollCardData: [
        {
          imageURL: "assets/products/original-cinnamon-roll.jpg",
          rollName: "Original Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 2.49,
          totalPrice: 2.49,
          show: true
        },
        {
          imageURL: "assets/products/apple-cinnamon-roll.jpg",
          rollName: "Apple Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 3.49,
          totalPrice: 3.49,
          show: true
        },
        {
          imageURL: "assets/products/raisin-cinnamon-roll.jpg",
          rollName: "Raisin Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75,
          show: true
        },
        {
          imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          rollName:"Chocolate Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75,
          show: true
        },
        {
          imageURL: "assets/products/walnut-cinnamon-roll.jpg",
          rollName: "Walnut Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 3.75,
          totalPrice: 3.75,
          show: true
        },
        {
          imageURL: "assets/products/gluten-free-cinnamon-roll.jpg",
          rollName: "Gluten Free Cinnamon Roll",
          glazingSelection: 0,
          glazingName: "Oiginal",
          quantitySelection: null,
          actualQuantity: 1,
          price: 4.75,
          totalPrice: 4.75,
          show: true
        },
      ],  

      // Create state for navbardata
      navBarData: {
          cartQuantity: 0,
          cartTotal: 0.00,
      },
      
      // Create state for pop-up
      popUpData:{
        showPopup: false,
        productName: null,
        glazingType: null,
        packSize: null,
        price: null,
      },

      // Create cart items list
      cartItems: [
        
      ],

      cartQuantity: 0,
      cartTotal: 0.00,
      
      showCart:false,
      sortBy: 'name',
      noFoundSearch: false,

    }
  }


  // Callback for when glazing is selected
  handleGlazingChange = (event, index) => {
    const glazing = parseFloat(event.target.value);
    const glazingName = event.target.options[event.target.selectedIndex].text;

    const newPrice = (this.state.rollCardData[index].price+ glazing) * this.state.rollCardData[index].quantitySelection;

    // Duplicate current state to update and overwrite old
    const updatedRollCardData = [...this.state.rollCardData];

    updatedRollCardData[index].glazingSelection = glazing;
    updatedRollCardData[index].totalPrice = newPrice;
    updatedRollCardData[index].glazingName = glazingName;
    
    this.setState({ 
      rollCardData: updatedRollCardData 
    });
  }
  
  // Callback for when the user selects a quantity
  handleQuantityChange = (event, index) => {
    // Added this dict to get appropriate state data for future update of the cart preview in navbar
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

  // Callback for when the add to cart button is pressed
  cartButtonHandler = (index) => {
    const updatedNavBarData = this.state.navBarData;
    
    const productImage = this.state.rollCardData[index].imageURL;
    const rollName = this.state.rollCardData[index].rollName;
    const glazing = this.state.rollCardData[index].glazingName;
    const quantity = this.state.rollCardData[index].actualQuantity;
    const priceToAdd = this.state.rollCardData[index].totalPrice;

    const updatedCartItems = this.state.cartItems;
    const newCartTotal = this.state.cartTotal + priceToAdd;

    updatedNavBarData.cartTotal += priceToAdd;
    updatedNavBarData.cartQuantity += 1;

    // Add roll to the cart items list and later add to state
    const cartItem = { productImage: productImage, name: rollName, glazing: glazing, quantity: quantity, price: priceToAdd };
    updatedCartItems.push(cartItem);
    // console.log(updatedCartItems);
    this.setState({ 
      navBarData: updatedNavBarData,
      cartItems: updatedCartItems,
      cartTotal: newCartTotal,
      cartQuantity: updatedCartItems.length,
      popUpData: {
        // Show the pop-up
        showPopup: true,
        productName: this.state.rollCardData[index].rollName,
        glazingType: this.state.rollCardData[index].glazingName,
        packSize: this.state.rollCardData[index].actualQuantity,
        price: priceToAdd.toFixed(2),
      },
    });

    // Add timeout so the pop-up dissapears after 3s
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

  //Callback for when someone clicks the cart button in the navbar
  cartLinkHandler = (e) => {
    this.setState({ 
      showCart: !this.state.showCart
    });
  }

  //Callback to remove an item in the cart display
  cartRemoveHandler = (e, index) => {
    const updatedCartItems = this.state.cartItems;
    
    const newCartTotal = this.state.cartTotal - updatedCartItems[index].price;
    updatedCartItems.splice(index, 1);
    const newCartQuantity = updatedCartItems.length;

    this.setState({ 
      cartItems: updatedCartItems, 
      cartQuantity: newCartQuantity,
      cartTotal: newCartTotal,
      
    });
  }

  //Callback for when someone selects a sort option
  handleSortChange = (e) => {
    const sortBy = e.target.value;
    const sortedRolls = [...this.state.rollCardData];
  
    if (sortBy === 'price') {
      sortedRolls.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name') {
      sortedRolls.sort((a, b) => a.rollName.localeCompare(b.rollName));
    }
  
    this.setState({
      sortBy,
      rollCardData: sortedRolls,
    });
  };

  //Call back to handle search and set each roll to show or not if it is a match
  handleSearch = (e) => {
    const parent = e.target.parentNode;
    const query = parent.querySelector('#searchbar').value;

    const updatedRollCardData = [...this.state.rollCardData];

    let showCount = 0;

    for (let i = 0; i < this.state.rollCardData.length; i++){
      if (!this.state.rollCardData[i].rollName.toLowerCase().includes(query.toLowerCase())){
        updatedRollCardData[i].show = false;
      }
      else{
        updatedRollCardData[i].show = true;
        showCount++;
      }
    }

    if(showCount > 0){
      this.setState({
        noFoundSearch: false
      })
    } else{
      this.setState({
        noFoundSearch: true
      })
    }

    this.setState({ 
      rollCardData: updatedRollCardData 
    });

  }

  render() {
    return (
      
    <div className="Home">

      {/* Create NavBar */}
      <NavBar 
        cartLinkHandler={this.cartLinkHandler}
      />

      {this.state.showCart && (
        <CartDisplay
          cartItems={this.state.cartItems}
          removeHandler={this.cartRemoveHandler}
          cartQuantity={this.state.cartQuantity}
          cartTotal={this.state.cartTotal}
        />

      )}

      <SearchBar
        handleSortChange={this.handleSortChange}
        searchHandler={this.handleSearch}
      />

      {/* conditional pop-up - adding to index.js */}
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

          {/* Create RollCards via Map */}
          {this.state.rollCardData.map((rollCard, idx) => {
            return <RollCard 
              key={rollCard.rollName} //Added key param because React was yelling at me
              rollIndex={idx}
              imageURL={rollCard.imageURL}
              rollName={rollCard.rollName}
              glazingSelection={rollCard.glazingSelection}
              quantitySelection={rollCard.quantitySelection}
              price={rollCard.price}
              totalPrice={rollCard.totalPrice}
              glazingChange={this.handleGlazingChange}
              quantityChange={this.handleQuantityChange}
              cartAdd={this.cartButtonHandler}
              show={rollCard.show}
              />;

            }
          )}

          {this.state.noFoundSearch && (
            <h1 className="product-listing">No Results!</h1>
          )}

        </div>
      </div>
    </div>
  );
  }
}

export default HomePage;