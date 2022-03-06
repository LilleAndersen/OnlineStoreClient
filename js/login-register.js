function resetShoot() {
    document.querySelector("#invalid").style.display = "none";
    document.querySelector("#incorrect").style.display = "none";
    document.querySelector("#correct").style.display = "none";
}

function verifyTextfield(invalid, incorrect, correct) {

    document.querySelector("#invalid").style.display = invalid;
    document.querySelector("#incorrect").style.display = incorrect;
    document.querySelector("#correct").style.display = correct;
}

async function verifyCredentials() {
    try {
        token = (await axios({
            method: 'post',
            url: api + '/auth/verify',
            data: {
                user: document.querySelector("#username").value,
                pass: document.querySelector("#password").value
            }
        })).data;
    }
    catch {
        console.error();
        verifyTextfield("initial", "none", "none")
    }

    localStorage['token'] = token; // only strings

    if (token.length === 0) {
        verifyTextfield("none", "initial", "none")
    }

    await getUser();

    verifyTextfield("none", "none", "initial")

    console.log(user);

    window.location.href = '/';

    localStorage['fullName'] = `${user.firstName} ${user.lastName}`;
}

async function newUser() {
    firstName = document.querySelector("#first-name").value;
    lastName = document.querySelector("#last-name").value;
    username = document.querySelector("#username").value;
    email = document.querySelector("#email").value;
    phoneNumber = document.querySelector("#phone-number").value;
    pfp = document.querySelector("#pfp").value;
    password = document.querySelector("#password").value;

    console.log(firstName, lastName, username, email, phoneNumber, pfp, password)

    try {
        await axios ({
            method: 'post',
            url: api + '/users',
            data: {
                FirstName: firstName,
                LastName: lastName,
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                Pfp: pfp,
                Password: password,
                AccessLevel: 0
            }
        });
    }
    catch {
        console.error();
        console.log(onerror)
    }

    window.location.href = '/';
}

async function getUser() {
    token = localStorage['token']

    user = (await axios({
        method: 'get',
        url: api + '/users',
        headers: {
            token: token
        }
    })).data;

    localStorage['userId'] = user.id;
}

async function loadWholeProfile() {
    await loadProfile()

    const allOrders = (await axios.get(api + '/orders/user?id=7')).data

    console.log(allOrders)

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

async function changeStatus(id) {
    let state = document.querySelector("#status-options").value;

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

async function deleteUser() {
    username = window.prompt("Enter your username (NOTE this will permanently delete your user): ");

    console.log(username)

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

    // var r=confirm("Are you sure!");
    // if (r===true)
    // {
    //     x="You deleted your account!";
    //
    //
    // }
    // else
    // {
    //     x="You account is still here!";
    // }
}

// Add register on login and reverse - Done
// Load orders on profile, change status on profile page - Done
// Remove hentai branding - Done
// Make page serious  - Done
// Styling on page (make it look not ugly) - Done
// Delete user - Done
// Make it so that you have to be logged to put things into cart - Done

// Add search on store?
// Prepare to make documentation (commenting, plan and other shit)
// Final touches on api (encrypt things, change createorder from needing user id to user token)
// Ship to api
// MAKE CAT FINISH PERSONVERN THING
// Finish personvern on my part
// Change quantity of what im buying
// Edit user from page

// Get responses from mom, templeos and firstgraders