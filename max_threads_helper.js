// run max_threads_helper.js omega-net basic_hack.js
// ARG 0 - params to send to script (hack target servername)
// ARG 1 - script name to start
// starts 2 scripts, splitting ram between them

/** @param {NS} ns */
export async function main(ns) {
    // starts hack on THIS machine with max num threads
    let server = ns.getHostname();

    let hackScript = 'hacks/growhack.js';
    let helperScript = 'hacks/weaken.js';
    let hackTarget = 'foodnstuff';
    if (ns.args.length > 0)
        hackTarget = ns.args[0];
    if (ns.args.length > 1)
        hackScript = ns.args[1];
    if (ns.args.length > 2)
        helperScript = ns.args[2];


    const maxRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server) + ns.getScriptRam('max_threads_helper.js');
    const growRam = ns.getScriptRam(hackScript);
    const weakRam = ns.getScriptRam(helperScript);

    // find amount of threads dedicated to each weaken
    let gThreads = Math.floor(maxRam / growRam); // start calculating at max ram dedicated to grow
    let secIncrease = ns.growthAnalyzeSecurity(gThreads, hackTarget, ns.getServer(server).cpuCores);
    let weakThreads = Math.ceil(secIncrease / 0.05) * 2; // run TWO weaken scripts
    if (weakThreads < 2) weakThreads = 2;
    let totalWeakRam = weakThreads * weakRam;
    gThreads = Math.floor((maxRam - totalWeakRam) / growRam);
    let totalGrowRam = gThreads * growRam;
    /*
    ns.tprint('sec increase by ' + secIncrease + ' threads at max (total ' +
        maxRam + 'gb), takes ' + weakThreads + ' weaken threads (' + totalWeakRam + 'gb)\n' +
        'totalGrowRam changed to ' + totalGrowRam + 'GB with ' + gThreads + ' threads, total '
        + (totalWeakRam + totalGrowRam) + 'GB / ' + maxRam + 'GB');
    // let hackThreads = Math.floor((availableRam * (17/20)) / ns.getScriptRam(hackScript));
    // let helpThreads = Math.floor((availableRam * (3/20)) / ns.getScriptRam(helperScript));
    */

    if (server == 'home') { gThreads -= 4; weakThreads -= 4; } // save some room for home scripts
    if (weakThreads < 50) { weakThreads = 50; gThreads -= 50; }


    if (ns.args.length > 0) { // start hack on args[0] on this server
        ns.run(helperScript, (weakThreads/2), hackTarget, 0); 
        ns.run(helperScript, (weakThreads/2), hackTarget, 5000); // pass sleep time as arg
        ns.spawn(hackScript, { threads: gThreads, spawnDelay: 6000 }, hackTarget, 10000);

    }

}