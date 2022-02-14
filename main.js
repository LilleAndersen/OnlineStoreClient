async function loadProducts()
{
    const products = (await axios.get("http://localhost:5189/products/all")).data



    for (const product of products)
    {
        console.log(product)
        document.querySelector("#product-list").innerHTML += `
            
            
            <div class="card_product">
                <img src="${product.imageUrl}" alt="Manglende bilde">
                <h2 class="card_title">${product.name}</h2>
                <p class="card_description">${product.description}</p>
                <div>
                    <p class="card_price">${product.price},00 kr</p>
                    <p class="card_stock">${product.stock} på lager</p>
                </div>
                <a class="btn" href="index.html">Add to cart</a>
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

loadProducts()