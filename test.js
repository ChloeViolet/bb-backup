// import { printTarget } from 'helper/server_info.js';
import { findHelper, sortServers, getTarget, sortServersLevel } from 'helper/find_servers.js';
/*
top 25 servers

['4sigma','ecorp','megacorp','nwo','clarkinc','kuai-gong','b-and-a','blade',
'omnitek','deltaone','fulcrumtech','global-pharm','zeus-med','stormtech',
'univ-energy','nova-med','aerocorp','unitalife','icarus','omnia','zb-def',
'powerhouse-fitness','zb-institute','defcomm','solaris','titan-labs']

*/

/** @param {NS} ns */
export async function main(ns) {

    let f = ns.formulas.hacking;
    let server = 'foodnstuff';
    if (ns.args.length > 0)
        server = ns.args[0];

    // let sObj = ns.getServer(server);
    // sObj.hackDifficulty = sObj.minDifficulty;

    // calculate the increase of a single grow
    let threads = Math.floor((16384) / ns.getScriptRam('hacks/growhack.js'));
    let secIncAmt = ns.growthAnalyzeSecurity(threads, server);
    ns.tprint('sec increase: ' + secIncAmt + ', requires ' + secIncAmt/0.05 + ' weaken threads')
    let weakRam = Math.ceil(secIncAmt/0.05) * ns.getScriptRam('hacks/weaken.js');
    ns.tprint('weakram ' + weakRam);
    

    /*
    let numThreads = h.growThreads(ns.getServer(server), ns.getPlayer(), ns.getServerMaxMoney(server), 1)
    let sram = ns.getScriptRam('hacks/growhack.js');

    ns.tprint(server + ' grow threads: ' +
        numThreads +  ' (growram ' + sram + 'gb ['  
        + (numThreads * sram) + '])\n'
        );
    }
    */
    // ns.tprint(getTarget(ns, 'home'));
     // ns.getHackingLevel();
    // ns.getServerRequiredHackingLevel('omega-net');
    /* let neighbors = ns.scan();
    for (let serv of neighbors) */
    /*
    let hacks = ['max-hardware', 'iron-gym', 'phantasy', 'silver-helix', 'omega-net', 'johnson-ortho'];
    for (let i = 0; i < hacks.length; i++)
        printTarget(ns, hacks[i]);
    */
    /*
    let pservs = ns.getPurchasedServers();
    for (let i = 0; i < pservs.length; i++) {
        //ns.upgradePurchasedServer(pservs[i], 8192);
        if (ns.exec('basic_hack.js', pservs[i], 3413, hacks[Math.floor(i / 2)]))
            ns.tprint('started hacking ' + hacks[Math.floor(i / 2)] + ' on ' + pservs[i]);
    }
    */


}