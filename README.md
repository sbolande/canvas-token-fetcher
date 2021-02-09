# Canvas Token Fetcher
Save a few clicks and fetch a new [Canvas API token](https://canvas.instructure.com/doc/api/file.oauth.html#manual-token-generation) from Canvas' admin login.

Powered by [Electron](https://www.electronjs.org/) and [Puppeteer](https://pptr.dev/)! 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Default values](#default-values) - secrets.json
- [Running in developer mode](#dev-mode)
----------
## Installation
**Requirements:** Git, Node, and NPM.
Clone this repository and run a basic NPM install.
```sh
# navigate to the folder you want to clone to, then clone down
git clone https://github.com/sbolande/canvas-token-fetcher.git
cd canvas-token-fetcher
# basic install, may take a minute to download Chromium for Puppeteer
npm install
```

----------
## Usage
To run, use `npm start`. This will run Electron and start the application.
The app takes the following inputs:
1. **Username**: Your Canvas admin username or CCT username.
2. **Password**
3. **Domain**: The subdomain -> `{subdomain}.instructure.com`.
4. **Purpose**: The purpose for retrieving a token, _optional_.
5. **Expires**: The expiration date-time of the token, defaults to upcoming Friday.

Press `FETCH TOKEN` and the Puppeteer will run and grab it for you. If successful, press `Copy to clipboard` and paste your token wherever you need!

----------
## Default Values
Wish Password Manager worked here? Sorry fam, functionality not yet implemented :disappointed:

----------
## Dev Mode
Wish you could watch Puppeteer work its magic? Sorry fam, functionality not yet implemented :disappointed:

----------
#### [Back to Top](#table-of-contents)
#### [ISC Opensource License](https://opensource.org/licenses/ISC)