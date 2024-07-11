import { findHelper } from 'helper/find_servers.js';

/** @param {NS} ns */
export async function main(ns) {    
    ns.tprint(getNuked(ns));
}


/** @param {NS} ns */
export function getNuked(ns) {
    let serverList = findHelper(ns);
    let success = [];

    for (let server of serverList) {
        try {
            ns.nuke(server);
            success.push(server);
        } catch {
            continue;
        }
    }
    return success;
}