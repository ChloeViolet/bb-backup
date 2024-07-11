/** @param {NS} ns */
export async function main(ns) {
    let t = Math.floor(ns.getServerMaxRam(ns.getHostname()) / ns.getScriptRam('basic_hack.js'));
    ns.tprint(t);
    return t;
}