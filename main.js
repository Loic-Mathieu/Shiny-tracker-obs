const {app, BrowserWindow, ipcMain} = require('electron');
const url = require("url");
const path = require("path");

const scripts = require(path.join(__dirname, `/dist/scripts`));

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1000,
		minWidth: 1000,
		height: 600,
		webPreferences: { nodeIntegration: true },
		title: 'Shiny tracker tool',
		icon: path.join(__dirname, `/dist/icon/icon.ico`)
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/index.html`),
			protocol: "file:",
			slashes: true
		})
	);
	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('keep-focus', function () {
	mainWindow.setAlwaysOnTop(true, 'screen');
})

app.on('loose-focus', function () {
	mainWindow.setAlwaysOnTop(false, 'screen');
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})

/*	=====	API	=====	*/
ipcMain.on('WRITE_FILE_TEXT', (event, arg) => {
	scripts.writeToFile(arg.path, arg.content);
})
