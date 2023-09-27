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
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 2.49,
          totalPrice: 2.49
        },
        {
          imageURL: "assets/products/apple-cinnamon-roll.jpg",
          rollName: "Apple Cinnamon Roll",
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 3.49,
          totalPrice: 3.49
        },
        {
          imageURL: "assets/products/raisin-cinnamon-roll.jpg",
          rollName: "Raisin Cinnamon Roll",
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          rollName:"Chocolate Cinnamon Roll",
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL: "assets/products/walnut-cinnamon-roll.jpg",
          rollName: "Walnut Cinnamon Roll",
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 3.75,
          totalPrice: 3.75
        },
        {
          imageURL: "assets/products/gluten-free-cinnamon-roll.jpg",
          rollName: "Gluten Free Cinnamon Roll",
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          price: 4.75,
          totalPrice: 4.75
        },
      ],  
      editorNoteTitle: "",
      editorNoteBody: "",
      selectedNoteIndex: null,

      navBarData: 
        {
          cartQuantity: 0,
          cartTotal: 0.00,
        }

    }
  }

  // Place Holder Functions
  handleGlazingChange = (event) => {
    
    // const glazing = event.target.options[event.selectedIndex].value;
    const newPrice = 'test';
    console.log(newPrice);
    this.setState(prevState => ({
      ...prevState,
      totalPrice: newPrice
    }))
  }
  
  handleQuantityChange = (event) => {
    // const newBody = event.target.value;
    // this.setState(prevState => ({
    //   ...prevState,
    //   editorNoteBody: newBody
    // }))
  }

  cartButtonHandler = (noteIndex) => {
    this.setState(prevState => ({
      ...prevState,
      // editorNoteTitle: this.state.rollCardData[noteIndex].noteTitle,
      // editorNoteBody: this.state.rollCardData[noteIndex].noteBody,
      // selectedNoteIndex: noteIndex
    }))
  };

  render() {
    return (
    <div className="Home">
      {/* Create NavBar */}
      <NavBar 
        cartQuantity={this.state.navBarData.cartQuantity}
        cartTotal={this.state.navBarData.cartTotal}
      />

      <div className='body-content'>
        <div className='product-grid'>
          {/* Create RollCards */}

          {this.state.rollCardData.map((rollCard, idx) => {
              return <RollCard 
                rollIndex={idx}
                imageURL={rollCard.imageURL}
                rollName={rollCard.rollName}
                glazingSelection={rollCard.glazingSelection}
                quantitySelection={rollCard.quantitySelection}
                price={rollCard.price}
                totalPrice={rollCard.totalPrice}
                glazingChange={this.handleGlazingChange}
                onEdit={this.editButtonHandler}/>;
              }
            )}

        </div>
      </div>
      
    </div>
  );
  }
}

export default HomePage;