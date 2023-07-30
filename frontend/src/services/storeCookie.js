export function storeCookie(token) {
  //if successfull login, store token from response to cookie
  let expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + expirationDate.toUTCString();
  document.cookie = "jwt" + "=" + token + "; " + expires + "; path=/";
}
