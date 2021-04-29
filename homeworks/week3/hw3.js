/* eslint-disable  no-unused-vars */
function isPrime(p) {
  if (p === 1) {
    return 'Composite'
  } else if (p >= 2) {
    const underP = Math.floor(Math.sqrt(p))
    for (let i = 2; i <= underP; i++) {
      if (p % i === 0) {
        return 'Composite'
      }
    }
    return 'Prime'
  }
}
