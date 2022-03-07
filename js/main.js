// Initializes variables

let fullName;

let token;

let user;

let firstName;

let lastName;

let username;

let email;

let phoneNumber;

let pfp;

let password;

let status;

// Logs the token
console.log(token)

// Function to check i've a user is logged in or not
function checkIfLoggedIn() {
    // Checks localstorage for token and name and puts them into variables
    token = localStorage['token'] || '';

    fullName = localStorage['fullName'] || "default profile";

    document.querySelector("#profile-btn").innerHTML = fullName;

    // Checks if if token is empty or not and changes ui depending
    if (token.length !== 0) {
        document.querySelector("#profile-logout-cluster").style.display = "initial";
        document.querySelector("#login-register-cluster").style.display = "none";
    } else {
        document.querySelector("#profile-logout-cluster").style.display = "none";
        document.querySelector("#login-register-cluster").style.display = "initial";
    }
}

function checkIfLoggedInCart(state) {
    token = localStorage['token'] || '';

    if (state === 'cart') {
        if (token.length !== 0) {
            window.location.href = '/cart.html';
        } else {
            window.location.href = '/register.html';
        }
    }
}

// Function to log out the user and to make its logged out no matter.
function logOut() {
    localStorage['token'] = "";

    localStorage['fullName'] = "";

    cart = [];

    localStorage['cart'] = cart;

    checkIfLoggedIn();
}

async function loadProfile() {
    await getUser()

    console.log(user)

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
}