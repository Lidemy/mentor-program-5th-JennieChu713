/* eslint-disable  no-unused-vars */
function isNarciss(n, m) {
  for (let i = n; i <= m; i++) {
    const len = String(i).length
    if (len === 1) {
      console.log(i)
    } else {
      let total = 0
      let quo = i
      while (quo !== 0) {
        const digit = quo % 10
        quo = Math.floor(quo / 10)
        total += digit ** len
      }
      if (total === i) {
        console.log(i)
      }
    }
  }
}
