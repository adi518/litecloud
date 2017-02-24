// http://stackoverflow.com/questions/10694571/verify-if-my-node-js-instance-is-dev-or-production
// https://discuss.atom.io/t/does-electron-support-es6/19366/18
const isdev = process.env.NODE_ENV === 'dev'
const electron = require('electron')
const {app, globalShortcut} = electron
// Module to control application life.
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Add context-menu (not part of the quick-start boilerplate)
require('electron-context-menu')({
    prepend: (params, browserWindow) => [{ // eslint-disable-line no-unused-vars
        // only show it when right-clicking images
        visible: params.mediaType === 'image', // doesn't work as expected, https://github.com/sindresorhus/electron-context-menu/issues/31
        showInspectElement: isdev
    }]
});

// Add debug tools (not part of the quick-start boilerplate)
const electronDebug = require('electron-debug')
let electronDebugOptions = {
    enabled: true,
};

if (isdev) {
    electronDebugOptions.showDevTools = true;
}

electronDebug(electronDebugOptions);

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.

    var options = {
        width: 1580,
        height: 1024,
        icon: 'favicon.ico',
        frame: false,
    }

    if (isdev) {
        //
    } else {
        options.minWidth = 1580;
        options.minHeight = 1024;
    }

    mainWindow = new BrowserWindow(options)

    if (isdev) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.setMenu(null);
    }

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: process.env.NODE_ENV
    }))

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
