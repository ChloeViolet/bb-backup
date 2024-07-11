/** @param {NS} ns */
export async function main(ns) {
    let target = 'foodnstuff';
    let sleepTime = 0;
    if (ns.args.length > 0) target = ns.args[0];
    if (ns.args.length > 1) sleepTime = ns.args[1];

    let minSec = ns.getServerMinSecurityLevel(target);
    // minSec += 5;
    let maxMoney = ns.getServerMaxMoney(target);
    // maxMoney *= 1;

    await ns.sleep(sleepTime);
    while (true) {                 
        if (ns.getServerMoneyAvailable(target) < maxMoney)
            ns.print('Grow:   ' + await ns.grow(target));
        else if (minSec < ns.getServerSecurityLevel(target))
            await ns.sleep(5000);
        else
            ns.print('Hack:   ' + await ns.hack(target));    }
}