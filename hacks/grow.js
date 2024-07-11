/** @param {NS} ns */
export async function main(ns) {
    let target = 'foodnstuff';
    let time = 0;

    if (ns.args.length > 0)
        target = ns.args[0];
    if (ns.args.length > 1)
        time = ns.args[1];
    
    await ns.sleep(time);
    while (true) {
        await ns.grow(target);
    }
}