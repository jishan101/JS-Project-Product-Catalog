const filterElm = document.querySelector(".filter");
const ulElm = document.querySelector(".product-collection");
const msgElm = document.querySelector(".msg");
const nameInputElm = document.querySelector(".name-input");
const priceInputElm = document.querySelector(".price-input");
const submitBtnElm = document.querySelector(".submit-btn");

if (!localStorage.getItem("productIdTrackerLocal")) {
    localStorage.setItem("productIdTrackerLocal", JSON.stringify(0));
}

let productIdTracker = JSON.parse(localStorage.getItem("productIdTrackerLocal"));
const productList = [];

function msg(message) {
    msgElm.textContent = message;
}

function noProduct() {
    if (ulElm.children.length <= 1) {
        msg("Insert Your Products");
    }
}
noProduct();

function addProductToList() {
    if (nameInputElm.value === '' || parseInt(priceInputElm.value) < 1 || priceInputElm.value === '') {
        alert("Please enter valid value");
    } else {
        msg("");
        const liElm = document.createElement("li");
        liElm.classList.add("list-group-item", "product-${productIdTracker}", "product");
        liElm.id = `product-${productIdTracker}`;
        liElm.innerHTML = `<strong>${nameInputElm.value}</strong><strong> - $${priceInputElm.value}</strong><i class="fas fa-trash-alt float-end m-1 delete-btn"></i>`;
        ulElm.insertAdjacentElement("beforeend", liElm);

        productList.push({id : productIdTracker, name : nameInputElm.value, price : parseInt(priceInputElm.value, 10)});

        nameInputElm.value = "";
        priceInputElm.value = "";

        productIdTracker++;
        localStorage.setItem("productIdTrackerLocal", JSON.stringify(productIdTracker));
    }
}

submitBtnElm.addEventListener("click", addProductToList);

ulElm.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        const targetParent = e.target.parentElement;
        targetParent.remove();

        const deleteIndex = productList.findIndex(product => product.id === parseInt(targetParent.id.split("-")[1], 10));
        productList.splice(deleteIndex, 1);

        noProduct();
        // console.log(deleteIndex);
        // console.log(productList);
    }
});

filterElm.addEventListener("keyup", e => {
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
});



