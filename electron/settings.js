const Store = require("electron-store");
const path = require("path");
const {app} = require("electron");
const storage = new Store();

const KEY_BOUNDS = 'WIN_SIZE';
const KEY_FILES = "FILES";

function getBounds() {
    return storage.get(KEY_BOUNDS, [1000, 600]);
}

function saveBounds(bounds) {
    storage.set(KEY_BOUNDS, bounds)
}

function getFilePath() {
    if (!storage.has(KEY_FILES)) {
        const default_path = path.join(app.getPath('userData'), 'save');
        storage.set(KEY_FILES, default_path);
    }

    return storage.get(KEY_FILES);
}

function saveFilePath(path) {
    storage.set(KEY_FILES, path)
}

module.exports = {
    getBounds: getBounds,
    setBounds: saveBounds,
    getSavePath: getFilePath,
    setSavePath: saveFilePath
}
