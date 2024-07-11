import { findHelper } from 'helper/find_servers.js';


/** @param {NS} ns */
export async function main(ns) {
    let servers = findHelper(ns);

    for (let server of servers) {
        ns.killall(server);
    }
}