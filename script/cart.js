// Step: 1
// Below code is used to target the label inside the cart.html
let label = document.getElementById("label");
// Below code is used to target the shoppingcart div inside the cart.html
let shoppingcart = document.getElementById("shoppingcart");

// Below code is used to create a basket of an array object
// Below code is also used to fetch data from localstorage
let basket = JSON.parse(localStorage.getItem("data"))|| [];


// Below code is used to display total amount ontop of the basket

let calculator = () => {
    cartonIcon = document.getElementById("cartAmount");
    cartonIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);

}

// Below code is used to call the function calculator
calculator();


// Below code is used to create a generateCart function
let generateCartItem = () => {
    if(basket.length !==0) {
        return (shoppingcart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            // Below code is used to create a search inside the basket
            // Below shopItemData is inside the data.js
            let search = shopItemData.find((y) => y.id === id) || [];
            // Below code is the template
            return `
            <!-- Below code is used to create cartItem -->
            <div class="cartItem">
                <img src=${search.img} alt="" width="100px">
                <!-- Below code is used to create the cart-details -->
                <div class="cartdetails">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p class="title">${search.name}</p>
                            <p class="price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id});" class="fa fa-x"></i>
                    </div>
                    <!-- Below code is used to create a button plus and minus -->
                    <div class="button">
                        <i onclick="decrement(${id})"  class="fa fa-minus"></i>
                        <!-- Below code is used to create quantity -->
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})"  class="fa fa-plus"></i>
                    </div>
                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>
            `;
        }).join(" "));
    } 
    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `
            <h2>Shopping Cart is Empty</h2>
            <a href="index.html">
                <button class="homeBTN">Back to Home Page</button>
             </a>
        `;
    }
};


// Below code is used to call the generateCartItem
generateCartItem();



// 3RD Step is to create a function that will target the button plus and minus button with update
// Below code is used to create an INCREMENT function
let increment = (id) => {
    let selectedItem = id;
    // Below code is used to create a search function
    let search = basket.find((x) => x.id === selectedItem.id);
    // Below code is the if esle condition
    if(search === undefined) {
        // Below code is used to add item to the basket array
        basket.push({
            id: selectedItem.id,
            item: 1
        });

    } else {
        // Below code is used to increment the search item
        search.item +=1;
    }
    // console.log(basket)
    update(selectedItem.id);
    generateCartItem();

        //Below code is used to save on the local Storage
        localStorage.setItem("data", JSON.stringify(basket)); 
};

// Below code is used to create a DECREMENT function
let decrement = (id) => {
    let selectedItem = id;

    // Below code is used to create a search function
    let search = basket.find((x) => x.id === selectedItem.id);
    // Below code is the if esle condition
    if(search === undefined) return;
    else if(search.item === 0) return;
    else  {
        // Below code is used to reduce the search item
        search.item -=1;
    }
    update(selectedItem.id);
    // console.log("Minus is Working");
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(basket));
};

// Below code is used to create an UPDATE function
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    // Below code is used to call the function calculator
    calculator();
    totalAmount();
};


// Below code is used to remove item from the cart basket
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);

    generateCartItem();
    totalAmount();
    calculator();
    //  Below code is use to save on the localstorage
    localStorage.setItem("data", JSON.stringify(basket));
};


// Below code is used to delete everything inside the cart basket
let clearCart = () => {
    basket = [];
    generateCartItem();
    calculator();
    localStorage.setItem("data", JSON.stringify(basket));
};


// Below code is used to generate Total Amount
let totalAmount = () => {
    if(basket.length !==0) {
        let amount = basket.map((x) => {
            let {item, id} =x;
            let search = shopItemData.find((y) =>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y, 0);
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
}; 

totalAmount();