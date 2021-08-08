let gDateFormat = require("dateformat");


export function getCurrentTimestamp(pDate: Date, pFormat: string = "yyyymmddHHMMss") {
    return gDateFormat(pDate, pFormat);
}