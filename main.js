const {app, BrowserWindow, ipcMain} = require('electron');
const url = require("url");
const path = require("path");
const fs = require('fs');

/*	=====	STORE	=====	*/
class Store {
	constructor(opts) {
		const userDataPath = app.getPath('userData');
		this.path = path.join(userDataPath, opts.configName + '.json');

		this.data = this.parseDataFile(this.path, opts.data);
	}

	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}

	parseDataFile(filePath, data) {
		try {
			return JSON.parse(fs.readFileSync(filePath));
		} catch(error) {
			return data;
		}
	}
}

const saveStore = new Store({
	configName: 'hunt-saves',
	data: {
		path: path.join(app.getPath('userData'), 'save')
	}
});

const huntStore = new Store({
	configName: 'hunts',
	data: {
		hunts: [],
	}
});

const preferencesStore = new Store({
	configName: 'preferences',
	data: {
		width: 1000,
		height: 600,
	}
});


/*	=====	WINDOW	=====	*/
let mainWindow
function createWindow () {
	mainWindow = new BrowserWindow({
		width: preferencesStore.get('width'),
		minWidth: 1000,
		height: preferencesStore.get('height'),
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

	mainWindow.on('resize', () => {
		let { width, height } = mainWindow.getBounds();
		preferencesStore.set('width', width);
		preferencesStore.set('height', height);
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
	let folderPath = saveStore.get('path') + '\\' + arg.hunt;
	if (!fs.existsSync(folderPath)){
		fs.mkdirSync(folderPath);
	}

	let fullPath = folderPath + '\\' + arg.fileName;
	console.log(fullPath);
	fs.writeFile(fullPath, arg.content, err => {
		console.log(err);
	});
})

ipcMain.on('GET_HUNTS', (event) => {
	event.returnValue = huntStore.get('hunts');
})

ipcMain.on('POST_HUNT', (event, arg) => {
	let hunts = huntStore.get('hunts');
	hunts.push(arg.hunt);
	huntStore.set('hunts', hunts);
})

ipcMain.on('PUT_HUNT', (event, arg) => {
	let hunts = huntStore.get('hunts');

	let updatedHunt = arg.hunt;
	let index = hunts.findIndex(hunt => hunt.name === updatedHunt.name);

	if (index >= 0) {
		hunts[index].name = updatedHunt.name;
		hunts[index].encounterNumber = updatedHunt.encounterNumber;
		hunts[index].odds = updatedHunt.odds;
		hunts[index].enabled = updatedHunt.enabled;
	}

	console.log('updated');

	huntStore.set('hunts', hunts);
})
