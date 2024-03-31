// The functionality of the web is here
// 1ST Step is to target the shop div element inside the index
// Below code is used to target the shop div element
let shop = document.getElementById("shop");

// 4TH Step
// Below code is used to create a basket of an array object
// Below code is used to create a Basket array object and fetching the data from localstorage
let basket =JSON.parse(localStorage.getItem("data")) || [];

// 2ND Step is to create a function that will generate each item inside the shop div element
// Below code is use to create a function to generate the item inside the shop div element
let generateShop = () => {
    // The shopItemData is an array of an object inside the data.js
    return (shop.innerHTML=shopItemData.map((x) => {
        let {id, name, desc, price, img} = x;
        // Below code is used to search the basket if their is data inside it
        let search = basket.find((x) =>x.id === id) || [];
        return `
        <!-- Below code is used to create First Card Div Element -->
        <div id=item-id-${id} class="item">
            <img src=${img} alt="" width="200">
            <!-- Below code is the details of the item-->
            <div class="details">
                <h2>${name}</h2>
                <p>${desc}</p>
                <!-- Below code is used to create the price and the amount -->
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <!-- Below code is used to create a buttons using fontawesome icons -->
                    <div class="button">
                        <i onclick="decrement(${id})"  class="fa fa-minus"></i>
                        <!-- Below code is used to create quantity -->
                        <div id=${id} class="quantity">
                          ${search.item === undefined ? 0 : search.item }
                        </div>
                        <i onclick="increment(${id})"  class="fa fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of First Card Div Element -->

        `;
        // End of template function 
    }).join(""));
};
// End of the generateshop function


// Below code is used to call the function to generate the item inside the shop div element
generateShop();


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
    
    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(basket));
};

// Below code is used to create an UPDATE function
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    // Below code is used to call the function calculator
    calculator();
};

// Below code is used to display total amount ontop of the basket

let calculator = () => {
    cartonIcon = document.getElementById("cartAmount");
    cartonIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);

}

// Below code is used to call the function calculator
calculator();