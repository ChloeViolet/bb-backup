/** @param {NS} ns */
export async function main(ns) {
    let servers = ns.getPurchasedServers();
    for (let i = 0; i < servers.length; i++) {
        let target = servers[i];
        if (target.substring(0,5) != 'pserv') continue;
        ns.killall(target);
    }
}