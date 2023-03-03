const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

function createWindow(){
    const window = new BrowserWindow({
        title: 'GitHub User Search App',
        width: 960,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile('index.html');

    window.webContents.on('before-input-event', (event, input) => {
        if(input.key === 'F12'){
            window.webContents.openDevTools();
            event.preventDefault();
        }
        else if(input.key === 'F5'){
            window.webContents.reload();
            event.preventDefault();
        }
    })
}

app.whenReady().then(() => {
    createWindow();
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }    
})

const isMacOS = process.platform === 'darwin';
app.on('window-all-closed', function(){
    (!isMacOS) ? app.quit() : null;
})