const { model } = require("mongoose");


const palindrome = (string) => {
    if (typeof string !== 'string') {
        return 
    }
    return string.split('').reverse().join('');
}


const avarage = array => {
    if (array.length === 0) return 0
    let sum = 0 
    array.forEach(num => {
        sum += num
    })
    return sum/array.length
}

module.exports = {
    palindrome,
    avarage
}