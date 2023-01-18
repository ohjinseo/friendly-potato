const { app, BrowserWindow } = require('electron') 
// include the Node.js 'path' module at the top of your file 
const path = require('path') 
// modify your existing createWindow() function 
function createWindow () { 
  const win = new BrowserWindow({ 
    width: 1180, 
    height: 768, 
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js') 
    } 
  }) 
  win.loadURL("http://localhost:3000") 
} 
app.whenReady().then(() => { 
  createWindow() 
}) 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})