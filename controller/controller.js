const printLog = true;

/** @param {NS} ns */
export async function main(ns) {
    const f = ns.formulas.hacking;
    const weakRam = '1.75';
    const growRam = '1.75';
    const hackRam = '1.70';

    let hackTarget = 'foodnstuff';
    let pServ = 'pserv-0';

    if (ns.args.length > 0)
        hackTarget = ns.args[0];
    if (ns.args.length > 1)
        pServ = ns.args[1];


    let maxRam = ns.getServerMaxRam(pServ); // - ns.getServerUsedRam(pServ);

    // find amount of threads dedicated to each weaken
    let gThreads = Math.floor(maxRam / growRam);
    let secIncrease = ns.growthAnalyzeSecurity(gThreads, hackTarget);
    let weakThreads = Math.ceil(secIncrease / 0.05);
    let totalWeakRam = weakThreads * weakRam;
    
    
    gThreads = Math.floor((maxRam-totalWeakRam) / growRam);
    let totalGrowRam = gThreads * growRam;

    ns.tprint('sec increase by ' + secIncrease + ' threads at max (total ' +
        maxRam + 'gb), takes ' + weakThreads + ' weaken threads (' + totalWeakRam + 'gb)\n' +
        'totalGrowRam changed to ' + totalGrowRam + 'GB with ' + gThreads + ' threads, total '
         + (totalWeakRam+totalGrowRam) + 'GB / ' + maxRam + 'GB');    
    // ns.tprint(totalGrowRam / maxRam);
    // ns.tprint(totalWeakRam / maxRam);


    let playerObj = ns.getPlayer();
    let serverObj = ns.getServer(hackTarget);
    // ASSUME AT MINSEC AND MINMONEY FOR CALCULATIONS
    serverObj.hackDifficulty = ns.getServerMinSecurityLevel(hackTarget);
    serverObj.moneyAvailable = 0;
    // ns.tprint('total grow threads: ' + f.growThreads(serverObj, playerObj, 999999999999));    
    let numberGrowsToMax = 0;
    while (serverObj.moneyAvailable < serverObj.moneyMax) {
        let serverMoney = f.growAmount(serverObj, playerObj, Math.ceil(maxRam / growRam), 1);
        serverObj.moneyAvailable += serverMoney;
        ns.tprint('growth on max ram threads: ' + serverMoney);
        numberGrowsToMax += 1;
    }
    ns.tprint('takes ' + numberGrowsToMax + ' grows at ' + gThreads + ' threads');





    // let growAmt = f.growAmount(serverObj, playerObj, numThreads, 1);
    // let growTm = f.growTime(serverObj, playerObj); // time to grow, based on sec level
    // amounts secLevel will increase
    // ns.hackAnalyzeSecurity(threads, hackTarget);
    // ns.growthAnalyzeSecurity(threads, hackTarget); 

    // first, weaken security to min using all threads (bc increased starting seclevel)
    // weaken decreases level by 0.05 per thread
    // let totalWeakThreads = Math.ceil((ns.getServerSecurityLevel(hackTarget) - ns.getServerMinSecurityLevel(hackTarget)) / 0.05); 
    // let maxWeakThreads = Math.floor(maxRam / weakRam);
    // let loops = Math.ceil(totalWeakThreads / maxWeakThreads);
    // // ns.tprint(totalWeakThreads);
    /* log(ns, hackTarget + ' sec ' + ns.getServerSecurityLevel(hackTarget) +
        '\nweakening ' + loops + ' times on ' + maxWeakThreads + ' threads');
    for (let i=0; i < loops; i++) {
        if (ns.exec('controller/weak.js', pServ, { threads: maxWeakThreads }, hackTarget) < 1) {
            ns.tprint('failed to exec weaken on ' + pServ);
            return 0;
        }
        await ns.sleep(f.weakenTime(serverObj, playerObj) + 20);
    }
    log(ns, hackTarget + ' sec ' + ns.getServerSecurityLevel(hackTarget));
    */

}


function log(ns, msg) {
    if (printLog)
        ns.tprint(msg);
}