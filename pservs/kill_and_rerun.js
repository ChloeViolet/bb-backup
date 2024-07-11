// import { killAndRun } from 'pservs/run_best_and_kill.js'


// kills, upgrades ram, then reruns same args

/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.tprint('pservs/kill_and_rerun.js [ramAmt] <[pserv-#]> ...<[pserv-n]>');
        return 0;
    }
    let ramAmt = ns.args[0];
    let pservs = [];

    if (ns.args.length == 1) // do all pservs
        pservs = ns.getPurchasedServers();
    else {
        for (let i = 1; i < ns.args.length; i++)
            pservs.push(ns.args[i]);
    }


    
    for (let server of pservs) { // upgrade every server and rehack
        for (let p of ns.ps(server)) {
            if (p.args.length == 0) continue;
            if (!ns.upgradePurchasedServer(server, ramAmt)) {
                ns.tprint('failed to upgrade server ' + server); 
                continue;
            }
            ns.killall(server);
            ns.exec('max_threads_helper.js', server, 1, p.args[0]);
            ns.tprint('upgraded ' + server + ', running hack on ' + p.args[0]);
            break; // only does arg for first script (oh well)
        }
    }


}