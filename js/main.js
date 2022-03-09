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

let api = 'https://api.little.yessness.com:5000';

let cart = [];

try {
    cart = JSON.parse(localStorage['cart']);
} catch {}

let totalPrice = JSON.parse(localStorage['totalPrice'] || 0);

let addressLine;

let addressName;

let postalNumber;

let country;

let addressId;

let userId = localStorage['userId'];

let orderId;

let link;

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

// Function to check if i have logged in or not when i click on the cart button.
function checkIfLoggedInCart(state) {
    token = localStorage['token'] || '';

    if (state === 'cart') {
        if (token.length !== 0) {
            window.location.href = '/pages/cart/'; // If logge in take to cart
        } else {
            window.location.href = '/pages/login/'; // If not logged in takes to login page
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

// Function to get the user from api and loads token (if available from localstorage)
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