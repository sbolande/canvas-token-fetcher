/******************** ONLOAD SETUP ********************/
const { ipcRenderer } = require('electron');
const moment = require('moment');
const fs = require('fs');

const secretsPath = './secrets/secrets.json';
const login = document.forms['login'];

// default expiration to next friday
login['expires'].value = moment().day(5).format("YYYY-MM-DDTHH:mm");

// set defaults from user secrets if found
if (fs.existsSync(secretsPath)) {
    console.log('User secrets found!');
    var secrets = require(secretsPath);
    // foreach secrets property, set value; if undefined set as empty string
    login['username'].value = secrets.username || '';
    login['password'].value = secrets.password || '';
    login['domain'].value = secrets.domain || '';
    login['purpose'].value = secrets.purpose || '';
}

// set focus to first empty field found
if (login['username'].value === '') login['username'].focus();
else if (login['password'].value === '') login['password'].focus();
else if (login['domain'].value === '') login['domain'].focus();
else if (login['purpose'].value === '') login['purpose'].focus();
else login['submit'].focus();

/******************** EVENT LISTENERS ********************/
// event listener for form submission
login.addEventListener('submit', event => {
    console.log('Submitting form to IPC main...');
    event.preventDefault(); // prevent "form.action" from executing
    login['submit'].disabled = true; // turn off button
    document.getElementById('loader').classList.add('loader'); // create loader
    document.getElementById('result-container').classList.add('hide'); // hide result-container, just in case
    document.getElementById('error-container').classList.add('hide'); // hide errors, just in case

    // send inputs to IPCMain in main.js
    let input = {
        username: login['username'].value,
        password: login['password'].value,
        domain: login['domain'].value,
        purpose: (login['purpose'].value === "" ? "Fetch" : login['purpose'].value),
        expires: login['expires'].value,
    };
    ipcRenderer.send('form-submission', input);
});

// event listener for successful result
ipcRenderer.on('token-result', (event, token) => {
    document.getElementById('loader').classList.remove('loader'); // remove loading animation
    login['token'].value = token; // set token result
    document.getElementById('submit-container').classList.add('hide'); // hide button
    document.getElementById('result-container').classList.remove('hide'); // unhide result-container
});

// event listener for failure result
ipcRenderer.on('token-failure', (event, reason) => {
    document.getElementById('loader').classList.remove('loader'); // remove loading animation
    login['error'].value = reason; // set error reason
    login['submit'].disabled = false; // re-enable button
    document.getElementById('error-container').classList.remove('hide'); // unhide error-container
    
    // hide error-container after 10 seconds
    setTimeout(() => {
        document.getElementById('error-container').classList.add('hide');
    }, 10000);
});

/******************** UTILITIES ********************/
// onclick for copying token to clipboard
function copyToken() {
    let token = login['token'];
    token.select(); // select text
    token.setSelectionRange(0, 9999); // for mobile
    document.execCommand('copy'); // copy to clipboard
    console.log('Copied token to clipboard.');
    document.getElementById('copy_token').innerText = 'Copied!'; // change innerText
    setTimeout(() => {
        document.getElementById('copy_token').innerText = 'Copy to clipboard'; // change back
    }, 5000);
}

// onclick for toggling "show password" & "hide password"
function togglePassword() {
    let password = login['password'];
    password.type = password.type === 'password' ? 'text' : 'password';
}