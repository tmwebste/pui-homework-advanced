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
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          totalPrice: 2.49
        },
        {
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          totalPrice: 3.49
        },
        {
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          totalPrice: 3.75
        },
        {
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          totalPrice: 3.75
        },
        {
          glazingSelection: "Keep Original",
          quantitySelection: 1,
          totalPrice: 3.75
        },
        {
          glazingSelection: "Keep Original",
          quantitySelection: 1,
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
    // const newTitle = event.target.value;
    // this.setState(prevState => ({
    //   ...prevState,
    //   editorNoteTitle: newTitle
    // }))
  };
  
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
          <RollCard 
              rollIndex={0}
              imageURL="assets/products/original-cinnamon-roll.jpg"
              rollName="Original Cinnamon Roll"
              glazingSelection={this.state.rollCardData[0].glazingSelection}
              quantitySelection={this.state.rollCardData[0].quantitySelection}
              price={2.49}
              totalPrice={this.state.rollCardData[0].totalPrice}
              onEdit={this.editButtonHandler} />
        
          <RollCard 
              rollIndex={1}
              imageURL="assets/products/apple-cinnamon-roll.jpg"
              rollName="Apple Cinnamon Roll"
              glazingSelection={this.state.rollCardData[1].glazingSelection}
              quantitySelection={this.state.rollCardData[1].quantitySelection}
              price={3.49}
              totalPrice={this.state.rollCardData[1].totalPrice}
              onEdit={this.editButtonHandler} />

          <RollCard 
              rollIndex={2}
              imageURL="assets/products/raisin-cinnamon-roll.jpg"
              rollName="Raisin Cinnamon Roll"
              glazingSelection={this.state.rollCardData[2].glazingSelection}
              quantitySelection={this.state.rollCardData[2].quantitySelection}
              price={3.75}
              totalPrice={this.state.rollCardData[2].totalPrice}
              onEdit={this.editButtonHandler} />

          <RollCard 
              rollIndex={3}
              imageURL="assets/products/double-chocolate-cinnamon-roll.jpg"
              rollName="Chocolate Cinnamon Roll"
              glazingSelection={this.state.rollCardData[3].glazingSelection}
              quantitySelection={this.state.rollCardData[3].quantitySelection}
              price={3.75}
              totalPrice={this.state.rollCardData[3].totalPrice}
              onEdit={this.editButtonHandler} />

          <RollCard 
              rollIndex={4}
              imageURL="assets/products/walnut-cinnamon-roll.jpg"
              rollName="Walnut Cinnamon Roll"
              glazingSelection={this.state.rollCardData[4].glazingSelection}
              quantitySelection={this.state.rollCardData[4].quantitySelection}
              price={3.75}
              totalPrice={this.state.rollCardData[4].totalPrice}
              onEdit={this.editButtonHandler} />

          <RollCard 
              rollIndex={5}
              imageURL="assets/products/gluten-free-cinnamon-roll.jpg"
              rollName="Gluten Free Cinnamon Roll"
              glazingSelection={this.state.rollCardData[5].glazingSelection}
              quantitySelection={this.state.rollCardData[5].quantitySelection}
              price={4.75}
              totalPrice={this.state.rollCardData[5].totalPrice}
              onEdit={this.editButtonHandler} />
        </div>
      </div>
      
    </div>
  );
  }
}

export default HomePage;