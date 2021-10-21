const filterElm = document.querySelector(".filter");
const ulElm = document.querySelector(".product-collection");
const msgElm = document.querySelector(".msg");
const nameInputElm = document.querySelector(".name-input");
const priceInputElm = document.querySelector(".price-input");
const submitBtnElm = document.querySelector(".submit-btn");

let productIdTracker = 0; //it will provide sort of unique id for the products
const productList = []; //it will store the product details

//it will show a message when there is no product or no product to show when filtering
function msg(message) {
    msgElm.textContent = message;
}

//it will show the message to insert product details when there is no product
function noProduct() {
    if (ulElm.children.length <= 1) {
        msg("Insert Your Products");
    }
}
noProduct();

//it will add the product details in the array as an object
const addProductToArray = () => {
    productList.push({id : productIdTracker, name : nameInputElm.value, price : parseInt(priceInputElm.value, 10)});

    nameInputElm.value = "";
    priceInputElm.value = "";

    productIdTracker++; //updating the id after inserting every product
};

//it will add the product in the ul list show on the UI
const addProductToList = () => {
    if (nameInputElm.value === '' || parseInt(priceInputElm.value) < 1 || priceInputElm.value === '') {
        alert("Please enter valid value");
    } else {
        msg("");
        const liElm = document.createElement("li");
        liElm.classList.add("list-group-item", "product-${productIdTracker}", "product");
        liElm.id = `product-${productIdTracker}`;
        liElm.innerHTML = `<strong>${nameInputElm.value}</strong><strong> - $${priceInputElm.value}</strong><i class="fas fa-trash-alt float-end m-1 delete-btn"></i>`;
        ulElm.insertAdjacentElement("beforeend", liElm);

        addProductToArray();
    }
};

//it will delete product from the UI as well as from the array when click on the trash icon
const deleteProductFromList = e => {
    if (e.target.classList.contains("delete-btn")) {
        const targetParent = e.target.parentElement;
        targetParent.remove();

        const deleteIndex = productList.findIndex(product => product.id === parseInt(targetParent.id.split("-")[1], 10));
        productList.splice(deleteIndex, 1);

        noProduct();
    }
};

//it will show the specific products with the text typed on the filter form in their names
const findProductFromList = e => {
    const text = e.target.value.toLowerCase();

    [...document.querySelectorAll(".product")].forEach(item => {
        if (item.firstElementChild.textContent.toLowerCase().indexOf(text) === -1) {
            item.style.display = "none";
            msg("No Product Found");
        } else {
            item.style.display = "block";
            msg("");
        }
    })
};

//an IIFE for all the event listeners
(() => {
    submitBtnElm.addEventListener("click", addProductToList);
    ulElm.addEventListener("click", deleteProductFromList);
    filterElm.addEventListener("keyup", findProductFromList);
})();




