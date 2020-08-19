const chalk = require('chalk')
const log = (...payload) => console.log.apply(console, payload);
const warning = (...payload) => {
    log(chalk.yellow(...payload))
}

const bad = (...payload) => {
    log(chalk.red(...payload))
}

const good = (...payload) => {
    log(chalk.green(...payload))
}

const color = (color = "red", ...payload) => {
    log(chalk[color](...payload))
}

const loud = (...payload) => {
    color('red', `\n\n# ---------------------------------------- #\n\n`)
    log(chalk.yellow(...payload))
    color('red', `\n\n# ---------------------------------------- #\n\n`)
}


module.exports = {
    color,
    log,
    loud,
    warning,
    bad,
    good
}
// warning('This is warning')
// bad('This is BAD!')
// good('Hooray!')
// loud("LOUD TIME")