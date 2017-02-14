export class Verify {
  static validEmpty(text) {
    return text.replace(/^\s+|\s+$/, '') !== '';
  }

  static validEmail(email) {
    return (/^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]{2,3}){1,2}$/).test(email);
  }

  static validPassword(password) {
    return (/^[0-9a-zA-Z_-]{6,}$/).test(password);
  }
}