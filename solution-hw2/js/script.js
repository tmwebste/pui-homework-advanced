//declare globals
const glazingOptions = {"keep-original": "Keep Original", "sugar-milk": "Sugar Milk", "vanilla-milk": "Vanilla Milk", "double-chocolate": "Double Choloate"};
const glazingPrices = {"keep-original": 0, "sugar-milk": 0, "vanilla-milk": 0.5, "double-chocolate": 1.5};
const packPrices = {'1':1, '3':3, '6':5, '12':10}

//get all product listings
const productListings = document.querySelectorAll('.product-listing');

//create empty cart array
let cartItems = [];
//create empty dict to store roll objects
let rollListings = {};

//Roll object
class Roll {
    constructor( productName, price, glazing, quantity, parentData ){
        this.productName = productName;
        this.price = price;
        this.glazingType = glazingOptions[glazing];
        this.glazingPrice = glazingPrices[glazing];
        this.quantity = quantity
        this.packMultiplier = packPrices[quantity];
        this.parentData = parentData;
        this.totalPrice = price;
    }

    //Updates price on page when a change is made - called from updateProduct()
    updateHTML( glazing, quantity ) {
        //get the listing price displayed in html
        const listingPrice = this.parentData.querySelector('.price');
        //update instance variables
        this.glazingType = glazingOptions[glazing];
        this.glazingPrice = glazingPrices[glazing];
        this.quantity = quantity;
        this.packMultiplier = packPrices[quantity];
        this.totalPrice = ((this.price + this.glazingPrice) * this.packMultiplier)

        //update price on screen
        listingPrice.innerText = `$${this.totalPrice.toFixed(2)}`;
    }

    //Called  to "duplicate" object data to a new dictionary when added to cart
    getObj(){
        return {'name':this.productName, 'price':this.price, 'glazingType':this.glazingType, 'glazingPrice':this.glazingPrice, 'quantity':this.quantity, 'packMultiplier':this.packMultiplier, 'parentData':this.parentData, 'totalPrice':this.totalPrice};
    }
}

// Run when an update happens to a product listing
function updateProduct( event ){
    //get important elements from the document
    const productData = event.target.closest('.product-listing'); // Get the data associated with that product
    const dropdownList = productData.querySelector('.glazing-list'); // Get child glazing list
    const packSelector = productData.querySelector('.quantity-selector'); //Get child quantity radio

    //get id of current product listing
    let id = productData.id;
    //get glazing type selected in current dropdown
    let selectedGlazing = dropdownList.options[dropdownList.selectedIndex].id;
    //set default quantity if the user hasnt selected on
    let packSize = 1;
    //see if the user has selected a quantity and set quantity
    try{
        packSize = packSelector.querySelector('input:checked').value;
    } catch{}
    //update the listing of the current product listing
    rollListings[id].updateHTML(selectedGlazing, packSize);
}

// Add to cart handler
function addToCart( event ){
    //get important elements from the document
    const cartQuantity = document.getElementById('cart-quantity');
    const cartTotal = document.getElementById('cart-total');
    const productData = event.target.closest('.product-data'); // Get the data associated with that product
    const productListing = productData.closest('.product-listing'); //Get parent listing

    let id = productListing.id;

    //create a copy of the associated roll object and add it to the cart list
    let tempObj = rollListings[id].getObj();
    cartItems.push(tempObj);

    let totalCartPrice = 0;
    for ( const cartItem of cartItems){
        totalCartPrice += cartItem['totalPrice'];
    }

    //update # of items in cart and total price in nav bar
    cartQuantity.innerText = cartItems.length + " Items";
    cartTotal.innerText = "Total: " + totalCartPrice.toFixed(2)

    //make the pop up appear
    popUpFunction(tempObj['name'], tempObj['glazingType'], tempObj['quantity'], tempObj['totalPrice']);

}

//Function to manage pop-up
function popUpFunction(productName, glazingType, productQuantity, productTotalPrice){

    //get important elements from the document
    const popUp = document.getElementById('pop-up');
    const popUpProduct = document.getElementById('cart-product-name-pop');
    const popUpGlazing = document.getElementById('cart-glazing-type-pop');
    const popUpQuantity = document.getElementById('cart-quantity-pop');
    const popUpPrice = document.getElementById('cart-price-pop');

    //update text within the pop-up
    popUpProduct.innerText = productName;
    popUpGlazing.innerText = glazingType + " glazing";
    popUpQuantity.innerText = "Pack of " + productQuantity;
    popUpPrice.innerText = "Price: $" + productTotalPrice.toFixed(2);

    //change pop-up class
    popUp.classList.remove("hide");
    popUp.classList.add("show");

    //switch class back after 3 seconds
    setTimeout(function () {
        popUp.classList.remove("show");
        popUp.classList.add("hide");
    }, 3000);
}

//Run on page load (defered in html)
//Loop through all product listings in HTML
for ( const productListing of productListings ){
    //get important elements from the document
    const productData = productListing.querySelector('.product-data');
    const cartAddButton = productListing.querySelector('.cart-add');
    const glazingList = productListing.querySelector('.glazing-list');
    
    //add glazing options to html
    for ( let i=0; i<Object.keys(glazingOptions).length; i++){
        const newOption = document.createElement('option');
        
        newOption.id = Object.keys(glazingOptions)[i];
        newOption.value = glazingPrices[Object.keys(glazingOptions)[i]];
        newOption.innerText = glazingOptions[Object.keys(glazingOptions)[i]];

        glazingList.appendChild(newOption);
    }

    //get the HTML ID and product name of the product listing
    let id = productListing.id;
    let name = productListing.querySelector('.product-label').innerText;

    //add event listeners to the product lising
    productData.addEventListener('change', updateProduct);
    cartAddButton.addEventListener("click", addToCart);

    //update the price on screen based on the data-value given to the products respective div
    const listingPrice = productListing.querySelector('.price');
    const priceInHTML = parseFloat(productData.getAttribute('data-value'))
    listingPrice.innerText = `$${priceInHTML}`;

    //make a new roll item with all the info ripped from the html
    let rollItem = new Roll(name, priceInHTML, 0, 1, productData);
    rollListings[id] = rollItem;
}
