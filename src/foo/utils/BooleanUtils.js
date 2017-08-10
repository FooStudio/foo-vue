/**
     * Returns if the specified value is a boolean
     * @param {object} value The value to be evaluated
     * @returns {boolean} if the specified value is a boolean
     */
export function getBoolean(value) {
    if (!value) return false;
    if (typeof value === "object") value = String(value);
    if (typeof value === "string") value.toString().toLowerCase();
    switch (value) {
        case true:
        case "on":
        case "si":
        case "true":
        case "yes":
        case "1":
        case 1: {
            return true;
        }
    }
    return false;
}

export default {
    getBoolean,
}

