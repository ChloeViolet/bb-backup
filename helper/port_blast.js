/** @param {NS} ns */
export default async function main(ns) {
    if (ns.args.length > 0)
        portBlast(ns, ns.args[0]);
    else
        portBlast(ns);
}

export function portBlast(ns, target = 'home') {
    //let target = ns.getHostname();
    if (ns.fileExists("BruteSSH.exe", "home"))
        ns.brutessh(target);
    if (ns.fileExists("FTPCrack.exe", "home"))
        ns.ftpcrack(target);
    if (ns.fileExists("relaySMTP.exe", "home"))
        ns.relaysmtp(target);
    if (ns.fileExists("HTTPWorm.exe", "home"))
        ns.httpworm(target);
    if (ns.fileExists("SQLInject.exe", "home"))
        ns.sqlinject(target);

}
