"use strict";

function proveCollatz(number) {
    function conjecture(number, steps) {
        if (number == 1)
        return steps;

        if (number % 2 == 0)
            return conjecture(number / 2, steps + 1);

        if (number % 2 != 0)
            return conjecture((3 * number) + 1, steps + 1);
    }

    return conjecture(number, 0);
}

for (let n = 2; n <= 10_000; n++) {
    let steps = proveCollatz(n);

    console.log(`Collatz proved for n = ${n}: sequence converges to 1 in ${steps} steps`);
}
