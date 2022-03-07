let api = 'https://api.little.yessness.com:5000';

let cart = [];

// localStorage['cart'] = []
//
// if (localStorage['cart'].length>0) {
//     cart = JSON.parse(localStorage['cart'] || '[]');
// }

let addressLine;

let addressName;

let postalNumber;

let country;

let addressId;

let userId = localStorage['userId'];

let orderId;

let link;

let totalPrice = JSON.parse(localStorage['totalPrice'] || '0');

async function loadProducts()
{
    checkIfLoggedIn()

    const products = (await axios.get(api + "/products/all")).data

    console.log(products)

    for (const product of products)
    {
        document.querySelector("#product-list").innerHTML += `
            <div class="card_product">
                <img src="${product.imageUrl}" alt="Manglende bilde">
                <h2 class="card_title">${product.name}</h2>
                <p class="card_description">${product.description}</p>
                <div>
                    <p class="card_price">${product.price},00 kr</p>
                    <p class="card_stock">${product.stock} på lager</p>
                </div>
                <a class="btn" onclick="addProductToOrder(${product.id}, '${product.name}', '${product.description}', ${product.price}) ">Add to cart</a>
            </div>
        `;
    }

    // for (const product of products)
    // {
    //     allProducts.push({product:{id: product.id, name: product.name}, quantity: 0})
    // }

    // document.querySelector("h2").innerText = axios.get(" http://localhost:5189/products/all").data;


    /*<tr>
        <td><img src="${product.imageUrl}"></td>
        <td>${product.name}</td>
        <td>${product.price} kr</td>
        <td>${product.stock}</td>
        <td>${product.description}</td>
        <td><a class="btn" href="index.className>Test</a></td>
            </tr>*/
}

async function addProductToOrder(productId, productName, productDescription, price) {

    if (token.length === 0) {
        window.location.href = '/register.html';
    } else {
        let saved = false;

        for (const product of cart)
        {
            if (product.product.id === productId) {
                product.quantity++;
                totalPrice = totalPrice + price;
                saved = true;
            }
        }

        if (!saved) {
            cart.push({product:{id: productId, name: productName, description: productDescription}, quantity: 1})
        }

        localStorage['cart'] = JSON.stringify(cart)
        localStorage['totalPrice'] = JSON.stringify(totalPrice);
    }
}

function printCart() {
    console.log(cart)
}

function loadCart() {
    checkIfLoggedIn()
    cart = JSON.parse(localStorage['cart'])
    printCart()

    for (const product of cart)
    {
        document.querySelector("#cart").innerHTML += `
            <div class="card_product">
                <h2 class="card_title">${product.product.name}</h2>
                <p class="card_description">${product.product.description}</p>
                <p class="card_description">${product.quantity}</p>
                
            </div>
        `;
    }

    document.querySelector("#totalPrice").innerHTML = JSON.parse(localStorage['totalPrice']);
}

function calculatePrice() {
    totalPrice = JSON.parse(localStorage['totalPrice']);
    console.log(totalPrice)
}

async function newOrder() {
    addressName = document.querySelector("#addressName").value;
    addressLine = document.querySelector("#addressLine").value;
    postalNumber = document.querySelector("#postalNumber").value;
    country = document.querySelector("#country").value;



    console.log(addressName, addressLine, postalNumber, country)

    try {
        addressId = (await axios ({
            method: 'post',
            url: api + '/orders/new/addresses',
            data: {
                AddressName:addressName,
                AddressLine:addressLine,
                PostalNumber:postalNumber,
                Country:country
            }
        })).data;
    }
    catch {
        console.error();
    }

    console.log(addressId)

    try {
        orderId = (await axios ({
            method: 'post',
            url: api + '/orders/new?id=' + userId + '&addressId=' + addressId + '&totalPrice=' + totalPrice
        })).data;
    }
    catch {
        console.error();
    }

    for (const product of cart) {
        console.log(product.id)
        try {
            link = (await axios ({
                method: 'post',
                url: api + '/orders/link?orderId=' + orderId + '&productId=' + product.product.id + '&quantity=' + product.quantity
            })).data;

        }
        catch {
            console.error();
            console.error();
        }
    }

    cart = [];
    totalPrice = 0;

    localStorage['cart'] = cart;
    localStorage['totalPrice'] = totalPrice;

    window.location.href = '../store.html';
}