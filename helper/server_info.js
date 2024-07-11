/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length > 0) { // print info for one server
        if (!ns.serverExists(ns.args[0])) { ns.tprint('server not found'); return 0; }
        
        for (let i=0; i < ns.args.length; i++)
            printTarget(ns, ns.args[i]);

    } else { // print info for all neighbors
        let neighbors = ns.scan();
        //let neighbors = ['silver-helix', 'phantasy', 'iron-gym', 'max-hardware', 'omega-net'];

        for (let i = 0; i < neighbors.length; i++) {
            let target = neighbors[i];
            if (target.substring(0, 5) == 'pserv') continue;
            //if (ns.getServerMaxMoney(target) == 0) continue;
            printTarget(ns, target);

        }
    }
} //  end main


/** @param {NS} ns */
export function printTarget(ns, server) {
    let info = server;
    info += '\nRAM:            '   + ns.getServerMaxRam(server) + ' GB';
    info += '\nHackLevel:      ' + ns.getServerRequiredHackingLevel(server);
    info += '\nMaxMoney:       ' + ns.formatNumber(ns.getServerMaxMoney(server));
    info += '\nMoneyAvailable: ' + ns.formatNumber(ns.getServerMoneyAvailable(server));
    info += '\nMinSecurity:    ' + ns.getServerMinSecurityLevel(server);
    info += '\nSecLevel:       ' + ns.getServerSecurityLevel(server);
    info += '\nGrowth:         ' + ns.getServerGrowth(server);
    info += '\nGrow Time:      ' + ns.tFormat(ns.getGrowTime(server));
    info += '\nHack Time:      ' + ns.tFormat(ns.getHackTime(server));
    info += '\nWeak Time:      ' + ns.tFormat(ns.getWeakenTime(server));
    info += '\nBackdoor:       ' + ns.getServer(server).backdoorInstalled;

    for (let p of ns.ps(server))
        info += '\nScript(s):      ' + p.filename + '[' + p.args + ']';
    info += '\n--------------------\n';

    ns.tprint(info);
}