const chalk = require('chalk');

const inverse = chalk.inverse.bold;
const error = chalk.bgRed.white.bold;
const warning = chalk.bgYellow.black.bold;
const success = chalk.bgGreen.black;
const primary = chalk.bgBlue.white;

module.exports = {
    error: error,
    warning: warning,
    success: success,
    primary: primary,
    inverse: inverse
}