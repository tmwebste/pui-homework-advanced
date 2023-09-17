const glazingOptions = {"keep-original": "Keep Original", "sugar-milk": "Sugar Milk", "vanilla-milk": "Vanilla Milk", "double-chocolate": "Double Choloate"};
const glazingPrices = {"keep-original": 0, "sugar-milk": 0, "vanilla-milk": 0.5, "double-chocolate": 1.5};
const packPrices = {'1':1, '3':3, '6':5, '12':10}

const productListings = document.querySelectorAll('.product-listing');

let cartItems = [];
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
        const listingPrice = this.parentData.querySelector('.price');
        this.glazingType = glazingOptions[glazing];
        this.glazingPrice = glazingPrices[glazing];
        this.quantity = quantity;
        this.packMultiplier = packPrices[quantity];
        this.totalPrice = ((this.price + this.glazingPrice) * this.packMultiplier)

        listingPrice.innerText = `$${this.totalPrice.toFixed(2)}`;
    }

    //Called  to "duplicate" object when added to cart
    getObj(){
        return {'name':this.productName, 'price':this.price, 'glazingType':this.glazingType, 'glazingPrice':this.glazingPrice, 'quantity':this.quantity, 'packMultiplier':this.packMultiplier, 'parentData':this.parentData, 'totalPrice':this.totalPrice};
    }
}

// Run when an update happens to a product listing
function updateProduct( event ){
    const productData = event.target.closest('.product-listing'); // Get the data associated with that product
    const dropdownList = productData.querySelector('.glazing-list'); // Get child glazing list
    const packSelector = productData.querySelector('.quantity-selector'); //Get child quantity radio

    let id = productData.id;
    let selectedGlazing = dropdownList.options[dropdownList.selectedIndex].id;
    let packSize = 1;
    try{
        packSize = packSelector.querySelector('input:checked').value;
    } catch{}
    rollListings[id].updateHTML(selectedGlazing, packSize);
}

// Add to cart handler
function addToCart( event ){
    const cartQuantity = document.getElementById('cart-quantity');
    const cartTotal = document.getElementById('cart-total');
    const productData = event.target.closest('.product-data'); // Get the data associated with that product
    const productListing = productData.closest('.product-listing'); //Get parent listing

    let id = productListing.id;

    let tempObj = rollListings[id].getObj();
    cartItems.push(tempObj);

    let totalCartPrice = 0;
    for ( const cartItem of cartItems){
        totalCartPrice += cartItem['totalPrice'];
    }

    cartQuantity.innerText = cartItems.length + " Items";
    cartTotal.innerText = "Total: " + totalCartPrice.toFixed(2)

    popUpFunction(tempObj['name'], tempObj['glazingType'], tempObj['quantity'], tempObj['totalPrice']);

}

//Function to manage pop-up
function popUpFunction(productName, glazingType, productQuantity, productTotalPrice){
    const popUp = document.getElementById('pop-up');

    const popUpProduct = document.getElementById('cart-product-name-pop');
    const popUpGlazing = document.getElementById('cart-glazing-type-pop');
    const popUpQuantity = document.getElementById('cart-quantity-pop');
    const popUpPrice = document.getElementById('cart-price-pop');

    popUpProduct.innerText = productName;
    popUpGlazing.innerText = glazingType + " glazing";
    popUpQuantity.innerText = "Pack of " + productQuantity;
    popUpPrice.innerText = "Price: $" + productTotalPrice.toFixed(2);


    popUp.classList.remove("hide");
    popUp.classList.add("show");

    setTimeout(function () {
        popUp.classList.remove("show");
        popUp.classList.add("hide");
    }, 3000);
}

//Run on page load (defered in html)
for ( const productListing of productListings ){
    const productData = productListing.querySelector('.product-data');
    const cartAddButton = productListing.querySelector('.cart-add');
    const glazingList = productListing.querySelector('.glazing-list');
    
    
    for ( let i=0; i<Object.keys(glazingOptions).length; i++){
        const newOption = document.createElement('option');
        
        newOption.id = Object.keys(glazingOptions)[i];
        newOption.value = glazingPrices[Object.keys(glazingOptions)[i]];
        newOption.innerText = glazingOptions[Object.keys(glazingOptions)[i]];

        glazingList.appendChild(newOption);
    }

    let id = productListing.id;
    let name = productListing.querySelector('.product-label').innerText;

    productData.addEventListener('change', updateProduct);
    cartAddButton.addEventListener("click", addToCart);

    const listingPrice = productListing.querySelector('.price');
    listingPrice.innerText = `$${parseFloat(productData.getAttribute('data-value'))}`;

    let rollItem = new Roll(name, parseFloat(productData.getAttribute('data-value')), 0, 1, productData);
    rollListings[id] = rollItem;
}
