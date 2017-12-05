import {padLeft} from "foo/utils/StringUtils";

/**
 * Convert a string to seconds, with these formats supported:
 *
 * 00:03:00.1 / 03:00.1 / 180.1s / 3.2m / 3.2h / 00:01:53,800
 * @param {string} value The string to be parsed
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {number} The number of seconds parsed
 */
export function stringToSeconds(value, delimiter = ":") {
    let arr = value.split(delimiter);
    let sec = 0;
    if (value.substr(-1) === "s") {
        sec = parseFloat(value.substr(0, value.length - 1));
    } else if (value.substr(-1) === "m") {
        sec = parseFloat(value.substr(0, value.length - 1)) * 60;
    } else if (value.substr(-1) === "h") {
        sec = parseFloat(value.substr(0, value.length - 1)) * 3600;
    } else if (arr.length > 1) {
        if (arr[2] && arr[2].toString().indexOf(",") !== -1) {
            arr[2] = arr[2].toString().replace(/,/, ".");
        }

        sec = parseFloat(arr[arr.length - 1]);
        sec += parseFloat(arr[arr.length - 2]) * 60;

        if (arr.length === 3) {
            sec += parseFloat(arr[arr.length - 3]) * 3600;
        }
    } else {
        sec = parseFloat(value);
    }
    return sec;
}

/**
 * Convert number to MIN:SS string.
 * @param {number} seconds The seconds to be formatted
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {string} The time formatted to string
 */
export function secondsToString(seconds, delimiter = ":") {
    return padLeft(Math.floor(seconds / 60).toString(), 2, "0") + delimiter + padLeft(Math.floor(seconds % 60).toString(), 2, "0");
}

/**
 * Format milliseconds as mm:ss.mmm
 * @param {time} milliseconds The milliseconds to be formatted
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {string} The string of the formatted time
 */
export function formatTime(milliseconds, delimiter = ":") {
    return padLeft(Math.floor(milliseconds / 60000).toString(), 2, "0") + delimiter + padLeft((Math.floor(milliseconds * 0.001) % 60).toString(), 2, "0") + -"." + padLeft((Math.round(Math.floor(milliseconds % 1000))).toString(), 3, "0");
}

/**
 * Format milliseconds as dd:hh:mm:ss.mmm , another approach
 * @param {number} milliseconds The milliseconds to be formatted
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {string} The string of the formatted time
 */
export function formatTime2(milliseconds, delimiter = ":") {
    return padLeft((Math.floor(milliseconds / 86400000)).toString(), 2, "0") +
        delimiter + padLeft((Math.floor(milliseconds / 3600000) % 24).toString(), 2, "0") +
        delimiter + padLeft((Math.floor(milliseconds / 60000) % 60).toString(), 2, "0") +
        delimiter + padLeft((Math.floor(milliseconds * 0.001) % 60).toString(), 2, "0") +
        "._" + padLeft((Math.round(Math.floor(milliseconds % 1000))).toString(), 3, "0");
}

/**
 * Format milliseconds as mm:ss
 * @param {number} milliseconds The time in milliseconds to be formatted
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {string} the string of the formatted time
 */
export function formatMinutesSeconds(milliseconds, delimiter = ":") {
    return padLeft(Math.floor(milliseconds / (60000)).toString(), 2, "0") + delimiter + padLeft((Math.floor(milliseconds / 1000) % 60).toString(), 2, "0");
}

/**
 * Format milliseconds as m:ss
 * @param {number} milliseconds The milliseconds to be formatted
 * @param {string} [delimiter=":"] The delimiter to be used
 * @returns {string} The string of the formatted time
 */
export function formatMinutesSecondsAlt(milliseconds, delimiter = ":") {
    return (Math.floor(milliseconds / 60000)).toString() + delimiter + padLeft((Math.floor(milliseconds / 1000) % 60).toString(), 2, "0");
}

export default {
    stringToSeconds,
    secondsToString,
    formatTime,
    formatTime2,
    formatMinutesSeconds,
    formatMinutesSecondsAlt,
}
