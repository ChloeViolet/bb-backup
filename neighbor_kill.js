/** @param {NS} ns */
export async function main(ns) {

    let neighbors = ns.scan();

    for (let serv of neighbors) {
        if (serv == 'home' || serv.substring(0,5) == 'pserv')
            continue;
        ns.killall(serv);
    }
}