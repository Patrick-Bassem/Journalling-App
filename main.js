const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  console.log('Creating window...');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    menuBarVisible: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  }); 

  win.setMenu(null);
  console.log('Loading index.html...');
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  console.log('App is ready');
  createWindow(); 
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
