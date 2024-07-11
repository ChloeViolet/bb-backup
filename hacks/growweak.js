/** @param {NS} ns */
export async function main(ns) {
    let target = 'foodnstuff';
    if (ns.args.length > 0) target = ns.args[0];

    let minSec = ns.getServerMinSecurityLevel(target);
    //let maxMoney = ns.getServerMaxMoney(target);
    //maxMoney *= 0.95;

    while (true) {
        if (minSec < ns.getServerSecurityLevel(target))
            ns.print('Weaken: ' + await ns.weaken(target));
        else // if (ns.getServerMoneyAvailable(target) < maxMoney)
            ns.print('Grow:   ' + await ns.grow(target));
        /*
        else
            ns.print('Hack:   ' + await ns.hack(target));
        */
    }
}