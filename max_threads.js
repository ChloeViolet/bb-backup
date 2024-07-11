// run max_threads_helper.js omega-net basic_hack.js
// ARG 0 - params to send to script (hack target servername)
// ARG 1 - script name to start
// starts 2 scripts - half available ram goes to basic_hack, other half goes to growweak

/** @param {NS} ns */
export async function main(ns) {
    // starts hack on THIS machine with max num threads
    let server = ns.getHostname();
    
    let hackTarget = 'foodnstuff';
    let hackScript = 'basic_hack.js';

    if (ns.args.length > 0) 
        hackTarget = ns.args[0];
    if (ns.args.length > 1)
        hackScript = ns.args[1];

    let availableRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server) + ns.getScriptRam('max_threads.js');
    let hackThreads = Math.floor(availableRam / ns.getScriptRam(hackScript));

    if (server == 'home') { hackThreads -= 3; } // save some room for home scripts

    if (ns.args.length > 0) { // start hacking args[0] on this server
        ns.spawn(hackScript, { threads: hackThreads, spawnDelay: 1000 }, hackTarget);

    } else { // just use default hardcoded hack target (dont use this much)
        ns.spawn(hackScript, { threads: hackThreads, spawnDelay: 1000 });
    }

}