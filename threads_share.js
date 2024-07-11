/** @param {NS} ns */
export async function main(ns) {
    let server = ns.getHostname();

    let hackScript = 'share.js';


    let availableRam = ns.getServerMaxRam(server);
    let hackThreads = Math.floor(availableRam / (ns.getScriptRam(hackScript) * 75));

    if (server == 'home') { hackThreads -= 3; } // save some room for home scripts

    for (let i = 0; i < hackThreads - 1; i++)
        ns.run(hackScript, 75);
    ns.spawn(hackScript, { threads:75, spawnDelay:100 });


}