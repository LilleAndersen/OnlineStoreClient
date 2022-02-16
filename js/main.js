let fullName;

console.log(token)

function checkIfLoggedIn() {
    token = localStorage['token']

    fullName = localStorage['fullName'] || "default profile";

    document.querySelector("#profile-btn").innerHTML = fullName;

    if (token.length !== 0) {
        document.querySelector("#profile-logout-cluster").style.display = "initial";
        document.querySelector("#login-register-cluster").style.display = "none";
    } else {
        document.querySelector("#profile-logout-cluster").style.display = "none";
        document.querySelector("#login-register-cluster").style.display = "initial";
    }
}

function logOut() {
    localStorage['token'] = "";

    localStorage['fullName'] = "";

    checkIfLoggedIn();
}

async function loadProfile() {
    await getUser()

    console.log(user)

    document.querySelector("#home-page").innerHTML += `
            <img id="pfp" src="${user.pfp}" alt="smh">
            <p id="name">${user.firstName} ${user.lastName}</p>
            <p id="username">${user.credentials.username}</p>
            <p id="email">${user.email}</p>
            <p id="number">+47 ${user.number}</p>
        `;
}