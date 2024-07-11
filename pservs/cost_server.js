/** @param {NS} ns */
export async function main(ns) {
    let str = '';
    for (let i = 2; i <= 20; i++) {
        let gb = Math.pow(2, i);
        str += gb
            + 'GB ram - $' + ns.formatNumber(ns.getPurchasedServerCost(gb)) + '\n';
    }
    ns.tprint(str);
}