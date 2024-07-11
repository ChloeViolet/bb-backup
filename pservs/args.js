import { getTarget } from 'helper/find_servers.js';


/** @param {NS} ns */
export async function main(ns) {    
    let targets = getCurrentHackTargets(ns)
    ns.tprint(targets);
    if (ns.args.length > 0) {
        if (contains(targets, ns.args[0])) {
            ns.tprint('contains ' + ns.args[0]);
        } else {
            ns.tprint('does not contain ' + ns.args[0]);
        }
    }
}

/** @param {NS} ns */
export function getCurrentHackTargets(ns) {    
    let pservs = ns.getPurchasedServers(); // get all pservs
    pservs.push('home');
    let currentHacks = [];
    
    for (let server of pservs) {
        let info = getTarget(ns, server);
        for (let p of ns.ps(info.name)) {
            if (p.args.length == 0) continue;
            if (p.filename == 'pservs/args.js') continue;
            if (!contains(currentHacks, p.args[0])) currentHacks.push(p.args[0]);
        }        
    }
    return currentHacks;
}

/** @param {NS} ns */
export function contains(array, check) {
    for (let i of array) {
        if (i == check) return true;
    }
    return false;
}