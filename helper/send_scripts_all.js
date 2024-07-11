import { findHelper } from 'helper/find_servers.js';

/** @param {NS} ns */
export async function main(ns) {
    let servers = findHelper(ns);
    for (let server of servers) {
        ns.scp('basic_hack.js', server);
        ns.scp('hacks/weaken.js', server);
        ns.scp('hacks/hack.js', server);
        ns.scp('hacks/grow.js', server);
        ns.scp('hacks/growweak.js', server);
        ns.scp('hacks/growhack.js', server);
        ns.scp('max_threads_helper.js', server);
        ns.scp('max_threads.js', server);
    }
}