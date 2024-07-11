import {  getTarget } from 'helper/find_servers.js';

/** @param {NS} ns */
export async function main(ns) {
    let pservs = ns.getPurchasedServers(); // get all pservs
    pservs.push('home');
    let info = [];

    for (let server of pservs) // get info object for each pserv
        info.push(getTarget(ns, server));
    
    // print ram and running scripts for all pservs
    for (let i of info) {
        let str = '( ' + i.name + ': ' + i.ram + 'gb )\n';
        for (let p of ns.ps(i.name)) {
            str += '\t' + p.filename + ' - ' + p.args + ' [' + p.threads + ']\n';
            if (p.filename == 'share.js') break;
        }
        ns.tprint(str);        
    }
    
}