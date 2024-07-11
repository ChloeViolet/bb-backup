import { findHelper } from 'helper/find_servers.js';
import { portBlast } from 'helper/port_blast.js';

/** @param {NS} ns */
export async function main(ns) {
    let serverList = findHelper(ns);
    let fail = [], success = [];

    for (let server of serverList) {
        portBlast(ns, server);
        try {
            ns.nuke(server);
            success.push(server);
        } catch {
            //ns.tprint('failed to nuke ' + target);
            fail.push(server);
        }
    }
    
    ns.tprint(
        '\nSuccessfully nuked: ' + success +
        '\n-----------------\n' +
        'Failed to nuke: ' + fail);
    //ns.tprint(serverList);
}