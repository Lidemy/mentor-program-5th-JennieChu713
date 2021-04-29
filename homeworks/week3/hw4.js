/* eslint-disable  no-unused-vars */
function isPalindrome(str) {
  const lenHalf = Math.floor(str.length / 2)
  for (let i = 0, j = str.length - 1; i <= lenHalf; i++, j--) {
    if (str[i] !== str[j]) {
      return 'False'
    }
  }
  return 'True'
}
