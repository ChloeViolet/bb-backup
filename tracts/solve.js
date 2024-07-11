/** @param {NS} ns */
export async function main(ns) {
    ns.tprint(prime_factors(1000)[0]);
}

/* Returns all the prime factors of a positive integer */
function prime_factors(n) {
    let factors = [];
    let d = 2;
    while (n > 1) {
        while (n % d == 0) {
            factors.push(d);
            n = n / d;
        }
        d += 1;
    }
    return factors.reverse();
}