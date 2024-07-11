import { getBestTargets } from 'pservs/buy_hacks_best.js'

/** @param {NS} ns */
export async function main(ns) {
    let bestTargets = getBestTargets(ns);
    let pservs = ns.getPurchasedServers();

    let ramUpgrade = 0;
    if (ns.args.length > 0)
        ramUpgrade = ns.args[0];

    killAndRun(ns, pservs, bestTargets, ramUpgrade);


}

/** @param {NS} ns */
export function killAndRun(ns, pservs, targets, ramUpgrade) {

    for (let i=0; i < pservs.length; i++) { // go through every pserv
        if (targets.length >= i) {
            ns.tprint('not enough hacking targets left');
            break;
        }
        let serv = pservs[i];
        ns.killall(serv);

        if ((ramUpgrade > 0) && (ns.getServerMaxRam(serv) < ramUpgrade)) { // optionally upgrade server ram
            if (ns.upgradePurchasedServer(serv, ramUpgrade))
                ns.tprint('upgraded ' + serv + ' to ' + ramUpgrade);
            else
                ns.tprint('failed to upgrade ' + serv);
        }
        ns.exec('sec_first.js', serv, { threads: 1 }, targets[i]); // start hack
    }

}