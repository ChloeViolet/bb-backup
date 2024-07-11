// start_pserv_hacks.js
// runs basic_hack.js on ALL player servers starting with 'pserv'
// can take server TO HACK as argument (sends to basic_hack.js as parameter)

/** @param {NS} ns */
export async function main(ns) {
    let servers = ns.getPurchasedServers();
    for (let i = 0; i < servers.length; i++) {
        let target = servers[i];
        if (target.substring(0, 5) != 'pserv') continue;
        sendScripts(ns, target);
        beginHack(ns, target);
    }
} // end main

function sendScripts(ns, target) {
    ns.scp('basic_hack.js', target);
    ns.scp('max_threads_helper.js', target);
    ns.scp('start_pserv_hacks.js', target);
}

/** @param {NS} ns */
function beginHack(ns, target) {
    // calculate max number of threads
    let threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam('basic_hack.js'));
    if (threads == 0) return;

    // run basic_hack
    try {
        if (ns.args.length > 0)
            ns.exec('basic_hack.js', target, threads, ns.args[0])
        else
            ns.exec('basic_hack.js', target, threads)
    } catch {
        ns.tprint('basic_hack failed (' + threads + ' threads) to start on ' + target);
    }
}