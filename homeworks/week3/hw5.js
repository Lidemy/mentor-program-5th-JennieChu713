/* eslint-disable  no-unused-vars */
function highLow(a, b, k) {
  let high = ''
  let low = ''
  if (a === b) {
    return 'DRAW'
  } else if (a.length > b.length) {
    high = 'A'
    low = 'B'
  } else if (a.length < b.length) {
    high = 'B'
    low = 'A'
  } else {
    let i = 0
    while (!high) {
      if (Number(a[i]) > Number(b[i])) {
        high = 'A'
        low = 'B'
      } else if (Number(a[i]) < Number(b[i])) {
        high = 'B'
        low = 'A'
      }
      i++
    }
  }
  if (k === '-1') {
    return low
  } else if (k === '1') {
    return high
  }
}
