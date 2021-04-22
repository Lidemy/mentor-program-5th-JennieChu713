function capitalize(str) {
    'use strict';
    let capital = str[0];
    const re = /[a-z]/;
    if (capital.match(re)) {
        return String.fromCharCode(capital.charCodeAt()-32) + str.slice(1);
    }
    return str;
}

console.log(capitalize('hello'));
