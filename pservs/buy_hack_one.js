import { buyHelper } from 'pservs/buy_server.js';
import { sendHelper } from 'pservs/sendto_pservs.js';

/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length < 2) { ns.tprint('needs RAM then hack target as arg'); return 0; }
    let ram = ns.args[0];
    let target = ns.args[1];

    let newServer = buyHelper(ns, ram);
    if (newServer < 0) { ns.tprint('failed to buy server'); return 0; }
    if (!sendHelper(ns)) { ns.tprint('failed to send scripts to server'); return 0; }
    
    ns.tprint('starting hack on [' + newServer + ']' + ' with target ' + target);
    ns.exec('max_threads_helper.js', newServer, 1, target);
}