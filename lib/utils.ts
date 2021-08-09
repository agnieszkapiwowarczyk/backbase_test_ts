import {logging} from 'selenium-webdriver';

let gDateFormat = require("dateformat");
import Level = logging.Level;

/**
* Gets date with entered date format.
* @param {string} pFormat - The date format to be used.
* @returns {string} - The current timestamp.
*/
export function getCurrentTimestamp(pDate: Date, pFormat: string = "yyyymmddHHMMss"): string {
    return gDateFormat(pDate, pFormat);
}

//logger
/**
* Logs all messages to the Console API.
* @param {!Entry} entry the entry to log.
*/
export function consoleHandler(entry): void {
    let date = new Date();
    let msg = `[${pad(date.getUTCMonth())}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}] [${entry.level.name }] ${entry.message}`

    console.log(msg);
}

/**
* Pads a number to ensure it has a minimum of two digits.
* @param {number} n the number to be padded.
* @return {string} the padded number.
*/
function pad(n: number): string {
    if (n >= 10) {
        return '' + n;
    } else {
        return '0' + n;
    }
}