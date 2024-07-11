/** @param {NS} ns */
export async function main(ns) {
    let serv, ram = 4096;
    if (ns.args.length == 0) {
        ns.tprint('give ram as arg');
        return 0;
    }            
    ram = ns.args[0];

    // default upgrade current surver, else upgrade args[1]
    if(ns.args.length == 2) 
        serv = ns.args[1];
    else
        serv = ns.getHostname();

    if (ns.getPurchasedServerCost(ram) > ns.getServerMoneyAvailable('home')) // check money
        ns.tprint('not enough money ($' + ns.getPurchasedServerCost(ram) + ')');

    if (ns.upgradePurchasedServer(serv, ram))
        ns.tprint('upgraded "' + serv + '" to ' + ram + ' GB ram');
    else
        ns.tprint('failed to upgrade ram');
}