const fs = require('fs');

module.exports = {
    writeToFile: (path, fileName, content) => {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }

        let fullPath = path + '/' + fileName;
        fs.writeFile(fullPath, content, err => {});
    }
}
