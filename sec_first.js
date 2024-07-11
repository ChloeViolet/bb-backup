/** @param {NS} ns */
export async function main(ns) {
    let helperScript = 'controller/weaken.js';
    let hackTarget = 'foodnstuff';
    let server = ns.getHostname();

    if (ns.args.length < 1) {
        ns.tprint('run sec_first.js <hackTarget> [<serverToRunOn>] [<script>]');
        return 0;
    }

    if (ns.args.length > 0)
        hackTarget = ns.args[0];
    if (ns.args.length > 1)
        server = ns.args[1];
    if (ns.args.length > 2)
        helperScript = ns.args[2];

    // keep weakening until at minimum
    while (ns.getServerSecurityLevel(hackTarget) > ns.getServerMinSecurityLevel(hackTarget)) { 
        let ramAvailable = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
        let threads = Math.floor(ramAvailable / ns.getScriptRam(helperScript));
        let sleepTime = ns.formulas.hacking.weakenTime(ns.getServer(hackTarget), ns.getPlayer());
        if (ns.exec(helperScript, server, threads, hackTarget) < 1) {
            ns.tprint('error executing weaken script');
            return 0;
        }
        await ns.sleep(sleepTime + 1000);
    }

    // start hacking on weakened server
    ns.tprint('security level on ' + hackTarget + ' is at minimum, starting max_threads_helper on ' + server);
    if (ns.getHostname() == server) // on this server
        ns.spawn('max_threads_helper.js', {threads:1, spawnDelay:500}, hackTarget);
    else 
        ns.exec('max_threads_helper.js', server, 1, hackTarget);


}