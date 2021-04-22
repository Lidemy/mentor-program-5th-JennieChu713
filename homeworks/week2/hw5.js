function join(arr, concatStr) {
    'use strict';
    if (arr.length < 2) {
        return arr.toString();
    }

    let conjoin = "";
    for (let i = 0; i < arr.length-1; i++) {
        conjoin += arr[i] + concatStr;
    }
    conjoin += arr.slice(-1);
    return conjoin;
}
  
function repeat(str, times) {
    'use strict';
    let multiStr = "";
    for (let i = 0; i < times; i++) {
        multiStr += str;
    }
    return multiStr;
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
