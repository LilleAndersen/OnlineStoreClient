let token;

let user;

let firstName;

let lastName;

let username;

let email;

let phoneNumber;

let pfp;

let password;

let accessLevel

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
            url: 'https://api.little.yessness.com:5000/auth/verify',
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

    document.querySelector("#profile").innerHTML += `
            <img id="pfp" src="${user.pfp}" alt="smh">
            <p id="name">${user.firstName} ${user.lastName}</p>
            <p id="username">${user.credentials.username}</p>
            <p id="email">${user.email}</p>
            <p id="number">+47 ${user.number}</p>
        `;

    localStorage['fullName'] = `${user.firstName} ${user.lastName}`;
}

function newUser() {

}

async function getUser() {
    token = localStorage['token']

    user = (await axios({
        method: 'get',
        url: 'https://api.little.yessness.com:5000/users',
        headers: {
            token: token
        }
    })).data;
}
