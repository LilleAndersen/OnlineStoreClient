let order = [];

let cart = [];

let product = [];

let number = 1;

loadProducts()

async function loadProducts()
{
    const products = (await axios.get("https://api.little.yessness.com:5000/products/all")).data



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
                <a class="btn" onclick="addProductToOrder(${product.id}, '${product.name}', 1)">Add to cart</a>
            </div>
        `;
    }

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

async function addProductToOrder(productId, productName, quantity) {
    // (await axios.get(`https://api.little.yessness.com:5000/products?id=${productId}`)).data

    product = [];

    product.push(productId, productName, quantity);

    cart.push(product)
}

function printCard() {
    console.log(cart);
}

// Make array with all products
// Set quantity of each product to zero
// Change quantity when something is added to cart
// If quantity of certain product isnt zero show in shopping kart
// Have static id's of all quantities


// Loop through every item
// Check if item is divisible by 3
// If yes do code if not move on