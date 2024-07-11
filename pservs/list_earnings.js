/** @param {NS} ns */
export async function main(ns) {
    class info {
        constructor(name, targets, earnings, ram) {
            this.name = name; this.targets = targets; this.earnings = earnings; this.ram = ram;
        }
    }
    let pinfos = [];
    let purchasedServers = ns.getPurchasedServers();
    purchasedServers.push('home');
    for (let s of purchasedServers) {
        //let server = ns.getServer(server);
        let targets = []; // for one server, for each script running
        let earnings = []

        for (let script of ns.ps(s)) { // add every running script to arrays
            if (script.args.length == 0) continue; // for on home exception
            if ((script.filename != 'hacks/growhack.js') && (script.filename != 'basic_hack.js')
                && (script.filename != 'controller/hack.js')
                && (script.filename != 'sec_first.js')) continue;
            let n;
            if (script.args.length == 1)
                n = ns.getScriptIncome(script.filename, s, script.args[0]);
            else
                n = ns.getScriptIncome(script.filename, s, script.args[0], script.args[1]);
            earnings.push(n);
            targets.push(script.args[0]);
        } // end script loop

        if (earnings.length > 0) // don't add no ps or no income servers
            pinfos.push(new info(s, targets, earnings, ns.getServerMaxRam(s)));
    } // end server loop

    pinfos.sort((a, b) => largest(a.earnings) - largest(b.earnings));
    // print that shit
    let s = '\n';
    for (let p of pinfos) {
        s += p.name + ' ';
        if (p.name == 'home') s += '    ';
        else if (p.name == 'pserv-0') s += ' ';
        for (let i = 0; i < p.targets.length; i++) {
            s += '(' + p.targets[i]
                + ' $' + ns.formatNumber(p.earnings[i]) + '/sec) '
                + p.ram + 'GB ram';
        }
        s += '\n';
    }
    ns.tprint(s);
} // end main

function largest(earnings) {
    let max = 0;
    for (let e of earnings) {
        if (e > max) max = e;
    }
    return max;
}