const { app, BrowserWindow, ipcMain } = require('electron');

let win;

// creates a new browser window
function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 730,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // after creation, open index.html
    win.loadFile('index.html');
    
    // handle a form submission event from renderer.js
    // this will call our puppeteer logic
    ipcMain.on('form-submission', (event, input) => {
        console.log(`Received form submission, fetching token for ${input.domain}.instructure.com`);
        // call puppeteer here
        event.reply('token-result', '12345');
    });
    
    // open the devtools
    // win.webContents.openDevTools();
    
    // clear window on quit
    win.on('closed', () => {
        win = null;
    });
}

// Create a window when electron has finished init
app.whenReady().then(createWindow);

/********* electron processes *********/
// quit when all windows closed
app.on('window-all-closed', () => {
    // OS-X needs help closing according to electron's docs
    if (process.platform !== 'darwin') app.quit();
});

// re-create window if no windows found
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});