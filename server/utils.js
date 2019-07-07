/**
 * Allows to call functions with callbacks in sequence
 * @param {function[]} arr 
 * @param {function} completed 
 */
function sequence(arr, completed) {
  let index = -1

  let ready = function() {
    if (index !== arr.length - 1) {
      callNext()
    } else {
      if (completed)
        completed()
    }
  }

  var callNext = function() {
    index++
    arr[index](ready, index)
  }
  
  callNext()
}

module.exports.sequence = sequence