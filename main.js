const filterElm = document.querySelector(".filter");
const ulElm = document.querySelector(".product-collection");
const msgElm = document.querySelector(".msg");
const nameInputElm = document.querySelector(".name-input");
const priceInputElm = document.querySelector(".price-input");
const submitBtnElm = document.querySelector(".submit-btn");
const updateBtnElm = document.querySelector(".update-btn");

let productIdTracker = 0; //it will provide sort of unique id for the products
const productList = []; //it will store the product details
let passTargetParentId = ""; //it will pass the li id from editProductFromList() to updateProductToList() process

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

    productIdTracker++; //updating the id after inserting every product
};

//it will add the product in the ul list to show on the UI
const addProductToList = () => {
    if (nameInputElm.value === '' || parseInt(priceInputElm.value) < 1 || priceInputElm.value === '') {
        alert("Please enter valid value");
    } else {
        msg("");
        const liElm = document.createElement("li");
        liElm.classList.add("list-group-item", "product-${productIdTracker}", "product");
        liElm.id = `product-${productIdTracker}`;
        liElm.innerHTML = `<strong>${nameInputElm.value}</strong><strong> - $${priceInputElm.value}</strong><i class="fas fa-trash-alt float-end m-1 delete-btn"></i><i class="fas fa-pencil-alt float-end m-1 edit-btn"></i>`;
        ulElm.insertAdjacentElement("beforeend", liElm);
        
        addProductToArray();
        nameInputElm.value = "";
        priceInputElm.value = "";
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

//it will take the product details and populate the name and price form, enable update button and disable filter form when click on the pen icon
const editProductFromList = e => {
    if (e.target.classList.contains("edit-btn")) {
        submitBtnElm.style.display = "none";
        updateBtnElm.style.display = "block";
        filterElm.setAttribute("disabled", "disabled");
        const targetParent = e.target.parentElement;
        nameInputElm.value = targetParent.firstElementChild.textContent;
        priceInputElm.value = parseInt(targetParent.firstElementChild.nextElementSibling.textContent.split("$")[1], 10);

        passTargetParentId = targetParent.id;
    }
};

//it will update the product details object in the array
const updateProductToArray = () => {
    const updateIndex = productList.findIndex(product => product.id === parseInt(passTargetParentId.split("-")[1], 10));
    
    productList[updateIndex].name = nameInputElm.value;
    productList[updateIndex].price = parseInt(priceInputElm.value, 10);

    passTargetParentId = "";
};

//it will update the product in the ul list to show on the UI
const updateProductToList = () => {
    if (nameInputElm.value === '' || parseInt(priceInputElm.value) < 1 || priceInputElm.value === '') {
        alert("Please enter valid value");
    } else {
        msg("");
        const targetParent = document.querySelector(`#${passTargetParentId}`);
        targetParent.firstElementChild.textContent = nameInputElm.value;
        targetParent.firstElementChild.nextElementSibling.textContent = ` - $${parseInt(priceInputElm.value, 10)}`;

        submitBtnElm.style.display = "block";
        updateBtnElm.style.display = "none";
        filterElm.removeAttribute("disabled");

        updateProductToArray();
        nameInputElm.value = "";
        priceInputElm.value = "";
    }
};

//it will show the specific products with the text typed on the filter form in their names
const findProductFromList = e => {
    const text = e.target.value.toLowerCase();
    let foundProductNo = 0;

    [...document.querySelectorAll(".product")].forEach(item => {
        if (item.firstElementChild.textContent.toLowerCase().indexOf(text) === -1) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
            foundProductNo++;
        }
    })
    if (foundProductNo <= 0) {
        msg("No Product Found");
    } else {
        msg("");
    }
};

//an IIFE for all the event listeners
(() => {
    submitBtnElm.addEventListener("click", addProductToList);
    ulElm.addEventListener("click", editProductFromList);
    updateBtnElm.addEventListener("click", updateProductToList);
    ulElm.addEventListener("click", deleteProductFromList);
    filterElm.addEventListener("keyup", findProductFromList);
})();




