
import products from "./products.js";
import cart from "./cart.js";

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

//load template file
const loadTemplate = () => {
  fetch("/template.html")
    .then(response => response.text())
    .then(html => {
      app.innerHTML = html;
      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;
      cart();
      initApp();
    });
};

loadTemplate();
const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter(value => value.id == idProduct)[0];
    console.log(info);
    
    if (!info) {
        window.location.href = '/';
        return;
    }

    // Ensure 'detail' exists
    let detail = document.querySelector('.detail');
    if (!detail) {
        console.error('Detail element not found!');
        return;
    }

    // Log the content of the 'detail' element
    console.log('Detail element:', detail);

    let nameElement = detail.querySelector('.name');
    if (nameElement) {
        nameElement.innerText = info.name;
    } else {
        console.error('Name element not found!');
    }

    let priceElement = detail.querySelector('.price');
    if (priceElement) {
        priceElement.innerText = '$' + info.price;
    } else {
        console.error('Price element not found!');
    }

    let descriptionElement = detail.querySelector('.description');
    if (descriptionElement) {
        descriptionElement.innerText = info.description;
    } else {
        console.error('Description element not found!');
    }

    let imageElement = detail.querySelector('.image img');
    if (imageElement) {
        imageElement.src = info.image;
    } else {
        console.error('Image element not found!');
    }

    detail.querySelector('.addCart').dataset.id = idProduct;

    //Similar Products
    let listProduct = document.querySelector(".listProduct");
  listProduct.innerHTML = null;
  products.filter((value)=> value.id != idProduct).forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML = `
        <a href="/detail.html?id=${product.id}">
        <img src = "${product.image}"/>
        </a>
        <h2>${product.name}</h2>
        <div class="price"> ${product.price}</div>
        <button class="addCart" data-id="${product.id}">
        Add To Cart </button>
        `;
    listProduct.appendChild(newProduct);
  });
};

