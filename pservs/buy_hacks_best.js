import { findHelper, sortServersLevel, getTarget } from 'helper/find_servers.js';
import { getCurrentHackTargets, contains } from 'pservs/args.js';
import { buyHelper, printCostInfo } from 'pservs/buy_server.js';
import { sendHelper } from 'pservs/sendto_pservs.js';

/** @param {NS} ns */
export async function main(ns) {
    ns.tprint('./pservs/buy_hacks_best.js <[amount of ram]> <[number to buy]>')

    let bestTargets = getBestTargets(ns); // servers with closest hacking level to playerlevel
    // ns.tprint(bestTargets);
    let currentHacks = getCurrentHackTargets(ns); // find all running hacks
    // ns.tprint(currentHacks);

    for (let i=0; i < currentHacks.length; i++) { // remove any targets already being hacked
        if (contains(bestTargets, currentHacks[i])) {
            let idx = bestTargets.indexOf(currentHacks[i]);
            bestTargets.splice(idx, 1);
        }
    }

    if (bestTargets.length == 0) {
        ns.tprint('No new ideal hack targets, exiting...');
        return 0;
    }


    if (ns.args.length == 0) {
        printCostInfo(ns);
        ns.tprint('\nBest Hack Targets: ' + bestTargets);
        return 0;
    }
    let ramAmt = ns.args[0];
    
    
    let buyAmt = bestTargets.length; // buy max numbers of servers
    if (ns.args.length > 1 && ns.args[1] <= buyAmt) // dont go over
        buyAmt = ns.args[1]; // buy arg number

    if (ns.getPurchasedServers().length == 25) {
        ns.tprint('25 servers already owned');
        return;
    }
    // buy and hack
    for (let i=0; i < buyAmt; i++) {
        let pserv = buyHelper(ns, ramAmt);
        if (pserv == -1) { ns.tprint('failed to purchase server'); return; }

        sendHelper(ns);

        ns.tprint('starting hack on ' + pserv + ' with target ' + bestTargets[i]);
        ns.exec('sec_first.js', pserv, 1, bestTargets[i]);
    }    
    
}



/** @param {NS} ns */
export function getBestTargets(ns) {
    let serverList = findHelper(ns); // get all server names
    let info = sortServersLevel(ns, serverList); // sort servers by max level
    
    for (let i=0; i < info.length; i++) // get rid of unhackable servers
        if (info[i].maxmoney < 1) info.splice(i, 1); 
    info.splice(0,1); // goodbye noodles :(

    let level = ns.getHackingLevel();
    let targetLvl = Math.ceil(level / 2) + 150;
    let closest = 0;
    for (let i=0; i < info.length; i++) { // find closest server to player's current hacking level
        if (Math.abs(info[i].level - targetLvl) < Math.abs(info[closest].level - targetLvl)) closest = i;
    }
    // ns.tprint('\nClosest: ' + info[closest].name + ': ' + info[closest].level);
    info.splice(closest+1); // remove everything higher level than closest
    info.reverse(); // flip it, index 0 is closest target now
    
    let bestTargets = [];
    for (let i of info) { // get just server names
        if (i.name == 'fulcrumassets') continue; // 1 growth
        bestTargets.push(i.name); 
    }

    return bestTargets;
}

