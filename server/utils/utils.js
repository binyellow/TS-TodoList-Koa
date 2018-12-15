function toSafeNumber(params, arr) {
  let newPrams = { ...params };
  arr.forEach(item=>{
    if(params[item]){
      newPrams[item] = +params[item]
    }
  })
  return newPrams;
}

module.exports = { toSafeNumber }