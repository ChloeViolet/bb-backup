// doesnt hack home or pservs

/** @param {NS} ns */
export async function main(ns) {
    let target = null;
    if (ns.args.length > 0) // hack given target instead of hardcoded in basic_hack.js
        target = ns.args[0];

    let neighbors = ns.scan();
    for (let serv of neighbors) {
        if (serv == 'home' || serv == 'darkweb' || serv.substring(0, 5) == "pserv")
            continue;
        beginHack(ns, serv, target);
    }
}

} // end main

/** @param {NS} ns */
function beginHack(ns, serv, target) {
    //let serv = ns.args[0];
    // calculate max number of threads and run basic_hack
    let threads = Math.floor(ns.getServerMaxRam(serv) / ns.getScriptRam('basic_hack.js'));
    if (threads == 0) return;
    if (target == null) {
        if (!ns.exec('basic_hack.js', serv, threads))
            ns.tprint('basic_hack failed (' + threads + ' threads) to start on ' + serv);
    } else {
        if (!ns.exec('basic_hack.js', serv, threads, target))
            ns.tprint('basic_hack failed (' + threads + ' threads) to start on ' + serv);
    }

}