/**
 * Humanize a string by remove any
 * hyphen and capitalize the first letter.
 *
 * @param {string} str The string to humanize.
 * @return {string} The humanized string.
 */
const humanize = (str) => {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}

module.exports = humanize;
