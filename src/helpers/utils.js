/**
 * pad zaro from left e.g. 8:30=>08:30.
 * @param {*} num - the input number
 * @param {*} dig - number of digits
 */
const padDigits = (num, dig) => Array(Math.max(dig - String(num).length + 1, 0)).join(0) + num;

/**
 * format input date.
 * @param {*} dt - date time as object or as string
 */
const formatDate = (dt) => {
  let date;
  if (typeof (dt) === 'string') {
    date = new Date(dt);
  } else {
    date = dt;
  }
  const separator = '/';
  const day = padDigits(date.getDate(), 2);
  const month = padDigits(date.getMonth() + 1, 2);
  const year = date.getFullYear();
  const hours = padDigits(date.getHours(), 2);
  const minutes = padDigits(date.getMinutes(), 2);
  return `${day}${separator}${month}${separator}${year} ${hours}:${minutes}`;
};

export default {
  formatDate,
};
