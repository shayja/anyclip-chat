// num = input number, dig = digits
const padDigits = (num, dig) => Array(Math.max(dig - String(num).length + 1, 0)).join(0) + num;

const formatToString = (dt) => {
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
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}${separator}${month}${separator}${year} ${hours}:${minutes}`;
};

export default formatToString;
