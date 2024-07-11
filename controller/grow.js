/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) return -1;
    let hackTarget = ns.args[0];
    let delayTime = 0;
    if (ns.args.length > 1)
        delayTime = ns.args[1];

    await ns.sleep(delayTime);
    return await ns.grow(hackTarget);
}