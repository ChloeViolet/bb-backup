import { findHelper, sortServers } from 'helper/find_servers.js';


/** @param {NS} ns */
export async function main(ns) {
    let serverList = findHelper(ns); // get all server names
    let info = sortServers(ns, serverList); // sort servers by max money

    for (let i of info)
        ns.tprint(i.name + ': ' + ns.formatNumber(i.maxmoney) + ' (' + i.level + ')');    
}