const fs = require('fs');

module.exports = {
    writeToFile: (path, content) => {
        console.log(path, content);
        // fs.watchFile();
    }
}
