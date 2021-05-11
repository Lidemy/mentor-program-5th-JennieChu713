function printStars(n) {
    'use strict';
    if (!Number.isInteger(Number(n))) {
        console.log(null);
    } else {
        for (let i = 0; i < n; i++) {
            console.log('*');
        }
    }
}

printStars(5)
