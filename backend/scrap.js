const isIsomorphic = (val1, val2) => {
  if (val1.length !== val2.length) return false

  let testObj = {}
  for (let i = 0; i < val1.length; i++) {
    if (testObj[val1[i]] === undefined) {
      testObj[val1[i]] = val2[i]
    } else if (testObj[val1[i]] !== val2[i]) {
      return false
    }
  }
  return true
}

console.log(isIsomorphic('egg', 'add'))
console.log(isIsomorphic('paper', "title"))
console.log(isIsomorphic('kick', "side"))
