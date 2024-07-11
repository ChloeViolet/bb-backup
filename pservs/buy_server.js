/** @param {NS} ns */
export async function main(ns) {
    // no args gives cost info
    if (ns.args.length == 0) { printCostInfo(ns); return -1; }
    // amt of ram to buy
    let ram = ns.args[0];
    buyHelper(ns, ram);
} // end main

/** @param {NS} ns */
export function buyHelper(ns, ram) {
    // arg required to be power of 2
    if (((Math.log2(ram) % 1) != 0)) { printCostInfo(ns); return -1; }

    // check server cost
    let cost = ns.getPurchasedServerCost(ram);
    if (ns.getServerMoneyAvailable("home") < cost) {
        ns.tprint('Not enough money ($' + cost + ')');
        return -1;
    }

    //if (!(await ns.prompt('Purchase server for $' + ns.formatNumber(cost) + '?'))) return -1;
    // get name of server
    // let hostname;
    // if (ns.args.length == 2)
    //     hostname = ns.args[1];
    // else
    let hostname = createName(ns);

    if (ns.purchaseServer(hostname, ram) != '')
        ns.tprint('purchased server ' + hostname + ' (' + ram + 'GB)');
    else
        ns.tprint('failed to purchase server');
    return hostname;
}

/** @param {NS} ns */
export function printCostInfo(ns) {
    let str = '';
    str += 'ram must be power of 2\n';
    for (let i = 2; i <= 20; i++) {
        let gb = Math.pow(2, i);
        str += gb
            + 'GB ram - $' + ns.formatNumber(ns.getPurchasedServerCost(gb)) + '\n';
    }
    ns.tprint(str);
}

/** @param {NS} ns 
 *  gives name 'pserv-#', based on number of owned servers
*/
function createName(ns) {
    let servs = ns.getPurchasedServers();
    let count = 0;

    for (let i = 0; i < servs.length; i++) // count number of servers named 'pserv*'
        if (servs[i].substring(0, 5) == "pserv") count++;

    let name = "pserv-";
    if (count > 0 && count < 10) name += "0";
    name += count;
    return name;
}