const utils = {
  /**
   * pad zaro from left e.g. 8:30=>08:30.
   * @param {*} num - the input number
   * @param {*} dig - number of digits
   */
  padDigits(num, dig) {
    return Array(Math.max(dig - String(num).length + 1, 0)).join(0) + num;
  },
  /**
   * format input date.
   * @param {*} dt - date time as object or as string
   */
  formatDate(dt) {
    let date;
    if (typeof (dt) === 'string') {
      date = new Date(dt);
    } else {
      date = dt;
    }
    const separator = '/';
    const day = this.padDigits(date.getDate(), 2);
    const month = this.padDigits(date.getMonth() + 1, 2);
    const year = date.getFullYear();
    const hours = this.padDigits(date.getHours(), 2);
    const minutes = this.padDigits(date.getMinutes(), 2);
    return `${day}${separator}${month}${separator}${year} ${hours}:${minutes}`;
  },
};
export default utils;
