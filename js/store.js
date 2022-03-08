// Loads totalprice fronm localstorage
let totalPrice = JSON.parse(localStorage['totalPrice'] || 0);

// Calls function to loadProducts
loadProducts()

// Function to load products
async function loadProducts()
{
    checkIfLoggedIn()

    const products = (await axios.get(api + "/products/all")).data

    // For loop to load all products with all appropriate information and variables
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
}

// Function to add a product to the order
async function addProductToOrder(productId, productName, productDescription, price) {

    if (token.length === 0) {
        window.location.href = '../pages/register/';
    } else {
        let saved = false;

        // Loops throuch every product in the cart and checks if its already there. If yes add another quantity, if not add the product to cart.
        for (const product of cart)
        {
            if (product.product.id === productId) {
                product.quantity++; // Adds quantity
                totalPrice = totalPrice + price; // Calculates total price
                saved = true;
            }
        }

        // Adds product to cart
        if (!saved) {
            cart.push({product:{id: productId, name: productName, description: productDescription}, quantity: 1})
        }

        // Saves cart and total price to localStorage
        localStorage['cart'] = JSON.stringify(cart)
        localStorage['totalPrice'] = JSON.stringify(totalPrice);
    }
}

