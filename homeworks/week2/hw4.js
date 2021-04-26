function printFactor(n) {
    'use strict';
    if (!Number.isInteger(Number(n))) {
        console.log(null);
    } else {
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) {
                console.log(i);
            }
        }
    }
}

printFactor(10);
