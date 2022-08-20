const {app, BrowserWindow, shell, ipcMain} = require('electron');
const url = require("url");
const path = require("path");
const fs = require('fs');
const settings = require('./electron/settings'); // TODO investigate on build crash
const isDev = require('electron-is-dev');

/*	=====	WINDOW	=====	*/
let mainWindow

function createWindow() {
	const bounds = settings.getBounds();
	mainWindow = new BrowserWindow({
		width: bounds[0],
		minWidth: 1000,
		height: bounds[1],
		// TODO check if websecurity is relevant
		webPreferences: {webSecurity: false, nodeIntegration: true},
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

	// TODO update action bar accordingly
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.on('resize', () => {
        let {width, height} = mainWindow.getBounds();
        settings.setBounds([width, height]);
    });
}

app.on('ready', () => {
	createWindow();
})

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
	// TODO move this in electron/fileService or something
	if (!fs.existsSync(settings.getSavePath())) {
		fs.mkdirSync(settings.getSavePath());
	}

	const folderPath = settings.getSavePath() + '\\' + arg.hunt;
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}

	const fullPath = folderPath + '\\' + arg.fileName;
	console.log(fullPath);
	fs.writeFile(fullPath, arg.content, err => {
		// TODO maybe log error files
		console.error(err);
	});
	event.returnValue = true;
});

ipcMain.on('DELETE_FILE_TEXT', (event, arg) => {
	// TODO move this in electron/fileService or something
	if (!arg.hunt) {
		event.returnValue = false;
	}

	// TODO to be tested
	const folderPath = settings.getSavePath() + '\\' + arg.hunt;
	fs.rmdirSync(folderPath, {recursive: true});
});

ipcMain.on('GET_SAVE_PATH', (event) => {
	event.returnValue = settings.getSavePath();
});

ipcMain.on('POST_SAVE_PATH', (event, arg) => {
	if (!arg.path) {
		event.returnValue = false;
	}

	settings.setSavePath(arg.path);
	event.returnValue = true;
});

// TODO move this in adequate file
ipcMain.on('OPEN_LINK', (event, arg) => {
	if (!arg.link) {
		event.returnValue = false;
	}

	shell.openExternal(arg.link).then(() => {
		event.returnValue = true;
	});
});
