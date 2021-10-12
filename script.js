// Responsive Drop-Down Menu for Navigation
function dropMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

// Gets Shopping Cart Item from "Add to Cart" button
let carts = document.querySelectorAll('.add-cart');

// All items available
let products = [
    {
        name: 'Item One',
        tag: 'itemONE',
        price: 15,
        inCart: 0
    },
    {
        name: 'Item Two',
        tag: 'itemTWO',
        price: 20,
        inCart: 0
    },
    {
        name: 'Item Three',
        tag: 'itemTHREE',
        price: 10,
        inCart: 0
    },
    {
        name: 'Item Four',
        tag: 'itemFOUR',
        price: 25,
        inCart: 0
    },
    {
        name: 'Item Five',
        tag: 'itemFIVE',
        price: 5,
        inCart: 0
    }
]

// Begin bulding each shopping cart item once 'Add to Cart' is clicked

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Access local storage to reflect current total number of items in
// shopping cart on the 'Cart' button on the nav header

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
   
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers +1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product); 
}

// Add item to cart if not already there, otherwise increase quantity of
// existing item in cart

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;    
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Determines Total Cost for shopping cart

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

// Display all shopping cart items on cart.html

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");

    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

// Verify that cart.html is currently viewed and, if Shopping Cart contains
// at least one item, writes HTML to cart.html

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="images/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `
        });

// DIV for Shopping Cart Total
        productContainer.innerHTML += `
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">
                    Total: 
                </h4>
                <h4 class="cartTotal">
                    $${cartCost}.00
                </h4>
        `;
    }
}

// Run on Page Load
onLoadCartNumbers();
displayCart();