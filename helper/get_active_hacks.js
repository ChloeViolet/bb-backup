/** @param {NS} ns */
export async function main(ns) {
    ns.tprint(getHacks(ns));
}

/** @param {NS} ns */
export function getHacks(ns) {
    let pservs = ns.getPurchasedServers();
    let hacks = '\nbasic_hack.js: ' + ns.ps('home')[0].args + ' (home)\n';

    for (let serv of pservs) {
        let processes = ns.ps(serv);
        for (let script of processes) {
            hacks += script.filename + ': ' +
                script.args +
                ' (' + serv + ')' + '\n';
        }
    }
    return hacks;
}

export default function getHackArgs(ns) {
    let pservs = ns.getPurchasedServers();
    let hacks = [];
    hacks.push(ns.ps('home')[0].args[0])

    for (let serv of pservs) {
        let processes = ns.ps(serv);
        for (let script of processes)
            hacks.push(script.args[0]);
    }
    return hacks;

}