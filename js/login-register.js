resetShoot()

// Function to reset login results
function resetShoot() {
    document.querySelector("#invalid").style.display = "none";
    document.querySelector("#incorrect").style.display = "none";
    document.querySelector("#correct").style.display = "none";
}

// Changes login results from invalid, incorrect and correct
function verifyTextfield(invalid, incorrect, correct) {

    document.querySelector("#invalid").style.display = invalid;
    document.querySelector("#incorrect").style.display = incorrect;
    document.querySelector("#correct").style.display = correct;
}

// Verifies the credentials provided with the apico
async function verifyCredentials() {
    // Tries given commands and catches the errors if any occur
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
        //console.error();
        verifyTextfield("initial", "none", "none")
    }

    // Stores token in localstorage
    localStorage['token'] = token; // only strings

    if (token.length === 0) {
        verifyTextfield("none", "initial", "none")
    }

    await getUser();

    verifyTextfield("none", "none", "initial")

    // Changes user page to the specified page
    window.location.href = '/';

    // Stores full name in localstorage
    localStorage['fullName'] = `${user.firstName} ${user.lastName}`;
}

// Function to add a new user
async function newUser() {
    // Grabs all values from necessary fields
    firstName = document.querySelector("#first-name").value;
    lastName = document.querySelector("#last-name").value;
    username = document.querySelector("#username").value;
    email = document.querySelector("#email").value;
    phoneNumber = document.querySelector("#phone-number").value;
    pfp = document.querySelector("#pfp").value;
    password = document.querySelector("#password").value;

    // Tries given commands and catches the errors if any occur
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

    // Changes user page to the specified page
    window.location.href = '../pages/privacy/';
}

// Add register on login and reverse - Done
// Load orders on profile, change status on profile page - Done
// Remove hentai branding - Done
// Make page serious  - Done
// Styling on page (make it look not ugly) - Done
// Delete user - Done
// Make it so that you have to be logged to put things into cart - Done
// Finish personvern on my part - Done
// Publish (ship) to api - Done
// Analyse security threat - Done

// Add search on store? - Prob not
// Prepare to make documentation (commenting, plan and other shit) - doing
// Final touches on api (encrypt things, change createorder from needing user id to user token) - WEDNESDAY AND THURSDAY
// MAKE CAT FINISH PERSONVERN THING - HE SAID HE IS GOING TO DO IT ON TUESDAY
// Change quantity of what im buying? - If i have time
// Edit user from page? - Prob not
// Get responses from mom, templeos and firstgraders - doing
// Make cart load on every page