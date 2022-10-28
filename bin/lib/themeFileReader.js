const fs = require( 'fs' );
const humanize = require('./humanize.js');

/**
 * Read a file and replace a string with another string.
 *
 * @param {string} theme repo name.
 * @param {string} file file to replace string in.
 */
const themeFileReader = ( theme, file ) => {
    try {
        fs.readFile(
            `${theme}/${file}`, 'utf-8',
            function (error, contents) {
                if (error) {
                    console.log(error);
                    return;
                }

                const replaced = contents.replace(/Create Block Based Theme/g, humanize(theme));

                fs.writeFile(
                    `${theme}/${file}`,
                    replaced, 'utf-8',
                    function (error) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                    }
                );
            }
        );

    } catch (error) {
        console.error("Error writing file:", error);
        process.exit(1);
    }
}

module.exports = themeFileReader;