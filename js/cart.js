// Calls function to loadCart
loadCart()

// Function to load cart
function loadCart() {
    checkIfLoggedIn()
    cart = JSON.parse(localStorage['cart'])

    for (const product of cart)
    {
        document.querySelector("#single-order-section").innerHTML += `
            
                <tr>
                    <td>${product.product.name}</td>
                    <td>${product.product.description}</td>
                    <td>${product.quantity}</td>
                </tr>
            
        `;
    }

    document.querySelector("#totalPrice").innerHTML = JSON.parse(localStorage['totalPrice']);
}

// Function to create a new order
async function newOrder() {
    addressName = document.querySelector("#addressName").value;
    addressLine = document.querySelector("#addressLine").value;
    postalNumber = document.querySelector("#postalNumber").value;
    country = document.querySelector("#country").value;

    // Tries given commands and catches the errors if any occur
    try {
        addressId = (await axios ({

            // API request with axios. Post request where the url field describes where the request should go and the data field what should be in it.
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

    //console.log(addressId)

    // Tries given commands and catches the errors if any occur
    try {
        orderId = (await axios ({

            // API request with axios. Post request where the url field describes where the request should go and what should be in it.
            method: 'post',
            url: api + '/orders/new?id=' + userId + '&addressId=' + addressId + '&totalPrice=' + totalPrice
        })).data;
    }
    catch {
        console.error();
    }

    // Tries given commands and catches the errors if any occur
    for (const product of cart) {

        // API request with axios. Post request where the url field describes where the request should go and what should be in it.
        try {
            link = (await axios ({
                method: 'post',
                url: api + '/orders/link?orderId=' + orderId + '&productId=' + product.product.id + '&quantity=' + product.quantity
            })).data;

        }
        catch {
            console.error();
        }
    }

    if (link === false) {
        alert("Something went wrong with the order, please try again!")
    } else {
        cart = []; // Clears cart
        totalPrice = 0; // Clears totalprice

        // Saves new values in localstorage
        localStorage['cart'] = cart;
        localStorage['totalPrice'] = totalPrice;

        // Changes page
        window.location.href = '/pages/store/';
    }
}