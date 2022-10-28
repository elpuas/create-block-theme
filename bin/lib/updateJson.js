const fs = require( 'fs' );

/**
 * Read a JSON file and return the contents as an object.
 *
 * @param {string} filePath The path to the file.
 * @param {function} cb The callback function.
 */
const jsonReader = (filePath, cb) => {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}


const updateJson = ( repo ) => {
    jsonReader(
        `${repo}/package.json`,
        (error, file) => {
            if (error) {
                console.error("Error reading file:", error);
                process.exit(1);
            }

            file.name = `${repo}`;

            fs.writeFile(`${repo}/package.json`, JSON.stringify(file, null, 2), error => {
                if (error) {
                    console.error("Error writing file:", error);
                    process.exit(1);
                }
            });
        }
    );
}

module.exports = updateJson;