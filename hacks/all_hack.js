/*
 run hacks/neighbors_hack.js [hackTarget] <[script]>
 */

//import { getNuked } from 'helper/get_nuked.js';
import { findHelper } from 'helper/find_servers.js';


/** @param {NS} ns */
export async function main(ns) {
    // let servers = ns.scan();
    let servers = findHelper(ns);
    
    let script = 'basic_hack.js';
    let hackTarget = 'foodnstuff';

    if (ns.args.length > 0) hackTarget = ns.args[0];
    if (ns.args.length == 2) script = ns.args[1];
    
    let log = []
    for (let server of servers) {
        ns.scp('basic_hack.js', server);
        ns.scp('max_threads_helper.js', server);
        ns.scp(script, server);
        if (beginHack(ns, server, script, hackTarget) > 0)
            log.push(server);

    }
    if (log.length > 0)
        ns.tprint('Hacks started on: ' + log);
    else 
        ns.tprint('No new hacks started');

} // end main


/** @param {NS} ns */
function beginHack(ns, server, script, hackTarget) {
    // calculate max number of threads
    let maxRam = ns.getServerMaxRam(server);
    if (maxRam == 0) return 0;

    let threads = Math.floor(maxRam / ns.getScriptRam(script));
    if (threads == 0 || threads == Infinity) return 0;

    // run hack
    try {        
        return ns.exec(script, server, threads, hackTarget);
    } catch {
        ns.tprint(script + ' script failed (' + threads + ' threads) to start on ' + server);
        return -1;
    }
    
}