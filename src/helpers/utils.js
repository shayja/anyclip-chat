
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

export const formatToString = (dt) => {

    if (typeof (dt) === 'string') {
        dt = new Date(dt);
    }
    const separator = '/',
        date = padDigits(dt.getDate(), 2),
        month = padDigits(dt.getMonth() + 1, 2),
        year = dt.getFullYear(),
        hours = dt.getHours(),
        minutes = dt.getMinutes();

    return `${date}${separator}${month}${separator}${year} ${hours}:${minutes}`;
};


