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
A desktop "shortcut" in the form of a `.bat` file will be created automatically on install. You can delete this if you'd like, it's just a nicety. 

----------
## Usage
To run, use "`npm start`" (this is what the desktop shortcut does). This will run Electron and start the application.
The app takes the following inputs:
1. **Username**: Your Canvas admin username or CCT username.
2. **Password**
3. **Domain**: The URL subdomain -> `{subdomain}.instructure.com`.
4. **Purpose**: The purpose for retrieving a token, _optional_.
5. **Expires**: The expiration date-time of the token, defaults to upcoming Friday.

Press `FETCH TOKEN` and the Puppeteer will run and grab it for you. If successful, press `Copy to clipboard` and paste your token wherever you need!

----------
## Default Values
Wish Password Manager worked here? Well have I got the workaround for you! To setup User Secrets for default values, do the following:
1. Create a new file named "`secrets.json`" in the "`/secrets`" folder.
2. Your JSON should house any values _you feel comfortable being on your hard drive_ like so:
    ```json
    {
        "username": "my_admin_username",
        "password": "",
        "domain": "byuird",
        "purpose": "API calls"
    }
    ```
    **You must follow the same naming & casing.** If you do not feel comfortable saving a value here (i.e. your password), either disclude the property or leave it as an empty string like above.

----------
## Dev Mode
Wish you could watch Puppeteer work its magic? Well you can in Dev Mode!

Use "`npm run dev`" to run in Dev Mode. This will open DevTools in Electron and run Puppeteer in non-headless mode.

----------
#### [Back to Top](#table-of-contents)