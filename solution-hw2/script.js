const glazingPrices = {"keep-original": 0, "sugar-milk": 0, "vanilla-milk": 0.5, "double-chocolate": 1.5};
const packPrices = {'one':1, 'three':3, 'six':5, 'twelve':10}

const productListings = document.querySelectorAll('.product-listing');

let cartItems = [];
let rollListings = {};

class Roll {
    constructor( productName, price, glazingPrice, packMultiplier, parentData ){
        this.productName = productName;
        this.price = price;
        this.glazingPrice = glazingPrice;
        this.packMultiplier = packMultiplier;
        this.parentData = parentData;
    }

    updateHTML( glazing, quantity ) {
        const listingPrice = this.parentData.querySelector('.price');
        this.glazingPrice = glazing;
        this.packMultiplier = quantity;

        listingPrice.innerText = `$${((this.price + this.glazingPrice) * this.packMultiplier).toFixed(2)}`;
    }

    getObj(){
        return {'name':this.productName, 'price':this.price, 'glazingPrice':this.glazingPrice, 'packMultiplier':this.packMultiplier, 'parentData':this.parentData};
    }
}

function updateProduct( event ){
    const productData = event.target.closest('.product-listing'); // Get the data associated with that product
    const dropdownList = productData.querySelector('.glazing-list'); // Get child glazing list
    const packSelector = productData.querySelector('.quantity-selector'); //Get child quantity radio

    let id = productData.id;
    let selectedGlazing = glazingPrices[dropdownList.options[dropdownList.selectedIndex].value];
    let packSize = 1;
    try{
        packSize = packPrices[packSelector.querySelector('input:checked').value];
    } catch{}
    rollListings[id].updateHTML(selectedGlazing, packSize);
}

function addToCart( event ){
    const productData = event.target.closest('.product-data'); // Get the data associated with that product
    const productListing = productData.closest('.product-listing'); //Get parent listing
    const dropdownList = productData.querySelector('.glazing-list'); // Get child glazing list
    const packSelector = productData.querySelector('.quantity-selector'); //Get child quantity radio

    let id = productListing.id;
    console.log(id);

    let price = parseFloat(productData.getAttribute('data-value'));
    let selectedGlazing = dropdownList.options[dropdownList.selectedIndex].value;
    let packSize = 1;
    try{
        packSize = packSelector.querySelector('input:checked').value;
    } catch{}

    const tempObj = rollListings[id].getObj();

    totalPrice = (price + glazingPrices[selectedGlazing]) * packPrices[packSize];
    cartItems.push(tempObj);
    console.log(cartItems);
}

for ( const productListing of productListings ){
    const productData = productListing.querySelector('.product-data');
    const cartAddButton = productListing.querySelector('.cart-add');
    let id = productListing.id;
    let name = productListing.querySelector('.product-label').innerText;

    productData.addEventListener('change', updateProduct);
    cartAddButton.addEventListener("click", addToCart);

    const listingPrice = productListing.querySelector('.price');
    listingPrice.innerText = `$${parseFloat(productData.getAttribute('data-value'))}`;

    let rollItem = new Roll(name, parseFloat(productData.getAttribute('data-value')), 0, 1, productData);
    rollListings[id] = rollItem;
}
