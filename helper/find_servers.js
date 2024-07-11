/** @param {NS} ns */
export async function main(ns) {
    let serverList = findHelper(ns); // get all server names

    let info = sortServers(ns, serverList); // sort servers by max money

    for (let i of info)
        ns.tprint(i.name + ': ' + ns.formatNumber(i.maxmoney) + ' (' + i.level + ')' + ' bd-' + i.backdoor);
    
    if (ns.args.length > 0) {
        ns.tprint('\n\n' + ns.scan(ns.args[0]));
    }
}

/** @param {NS} ns 
 * returns info class object for ONE server  */
export function getTarget(ns, server) {
    return {
        name: server,
        level: ns.getServerRequiredHackingLevel(server),
        ram: ns.getServerMaxRam(server),
        maxmoney: ns.getServerMaxMoney(server),
        minsec: ns.getServerMinSecurityLevel(server),
        growth: ns.getServerGrowth(server),
        growtime: ns.tFormat(ns.getGrowTime(server)),
        hacktime: ns.tFormat(ns.getHackTime(server)),
        weaktime: ns.tFormat(ns.getWeakenTime(server)),
        backdoor: ns.getServer(server).backdoorInstalled,
    }
}

/** @param {NS} ns 
* starting at home, find all neighbors and scan each, eventually getting all servers 
* returns array of all server names */
export function findHelper(ns) {
    let serverList = new Array;
    serverList = findServers(ns, 'home', serverList);
    for (let i = 0; i < serverList.length; i++)
        serverList = findServers(ns, serverList[i], serverList);
    return serverList;
}

/** @param {NS} ns 
 *  finds all neighbors of a given target, adds to serverList if not already */
export function findServers(ns, target, serverList) {
    let check = ns.scan(target);

    for (let i = 0; i < check.length; i++) {
        if (!arrayContains(serverList, check[i])) { // add new servers to list
            if (check[i].substring(0, 5) != "pserv" && check[i] != "home") // dont add these
                serverList.push(check[i]);
        }
    }
    return serverList;
}

// checks if list array already contains item
export function arrayContains(list, item) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == item)
            return true;
    }
    return false;
}

/** @param {NS} ns 
 *  @param {Array} serverList 
 *  sorts array of servers based on maxmoney
 */
export function sortServers(ns, serverList) {
    let info = []
    for (let serv of serverList) {
        info.push(getTarget(ns, serv));
    }
    info.sort((a, b) => (a.maxmoney - b.maxmoney));
    return info;
}

export function sortServersLevel(ns, serverList) {
    let info = []
    for (let serv of serverList) {
        info.push(getTarget(ns, serv));
    }
    info.sort((a, b) => (a.level - b.level));
    return info;
}

/** @param {NS} ns 
 *  @param {Array} serverList 
 *  sorts array of servers based on hacking level
 */
export function sortLevel(ns, serverList) {
    let info = []
    for (let serv of serverList) {
        info.push(getTarget(ns, serv));
    }
    info.sort((a, b) => (a.level - b.level));
    return info;

}