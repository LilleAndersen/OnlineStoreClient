loadProfile() // Calls function loads profile

// Loads profile
async function loadProfile() {
    await getUser()

    // Loads profile and puts into html
    document.querySelector("#profile-page").innerHTML += `
            <div id="card-profile">
                <div>
                    <img id="pfp" src="${user.pfp}" alt="smh">
                    <p id="name">${user.firstName} ${user.lastName}</p>
                    <p id="username">${user.credentials.username}</p>
                    <p id="email">${user.email}</p>
                    <p id="number">+47 ${user.number}</p>
                </div>
            </div>
        `;

    userId = localStorage['userId'];

    const allOrders = (await axios.get(api + '/orders/user?id=' + userId)).data

    // Loads all orders and puts into html
    for (const order of allOrders)
    {
        document.querySelector("#all-orders-section").innerHTML += `
            <table id="single-order-section">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Shipping Information</th>
                    <th>Total price</th>
                   
                    <th>Timestamp</th>
                    <th>Status</th>
                    <th>Change status</th>
                </tr>
                <tr>
                    <td>${order.id}</td>
                    <td>${order.address.addressName}</td>
                    <td>${order.user.credentials.username}</td>
                    <td>${order.address.addressLine}, ${order.address.postalNumber.number} ${order.address.postalNumber.place}, ${order.address.country}</td>
                    <td>${order.totalPrice}</td>
                    <td>${order.orderTimestamp}</td>
                    <td id="id${order.id}">${order.status}</td>
                    <td>
                        <select id="status-options" onchange="changeStatus(${order.id})">
                            <option value="Unset">Unset</option>
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Unfulfilled">Unfulfilled</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </td>
                </tr>
            </table>
        `;
    }
}

// Function to change the order status
async function changeStatus(id) {
    let state = document.querySelector("#status-options").value;

    // Tries given commands and catches the errors if any occur
    try {
        status = (await axios ({
            method: 'post',
            url: api + '/orders/update?status=' + state + '&id=' + id
        })).data;
    }
    catch {
        console.error();
    }

    document.querySelector("#id" + id).innerHTML = state;
}

// Function to delete a user
async function deleteUser() {
    username = window.prompt("Enter your username (NOTE this will permanently delete your user): ");

    // Tries given commands and catches the errors if any occur
    try {
        await axios({
            method: 'delete',
            url: api + '/users',
            headers: {
                username: username
            }
        });

    }
    catch {
        console.error();
    }
}