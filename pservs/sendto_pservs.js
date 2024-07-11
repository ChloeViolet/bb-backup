// import { portBlast } from 'helper/port_blast.js';
/** @param {NS} ns */
export async function main(ns) {
    sendHelper(ns);
} // end main


export function sendHelper(ns) {
    let neighbors = ns.scan();
    let success = []

    for (let server of neighbors) {
        //ns.tprint(neighbors[n])
        if (server.substring(0, 5) != 'pserv')
            continue;

        ns.scp('basic_hack.js', server);
        ns.scp('hacks/weaken.js', server);
        ns.scp('hacks/hack.js', server);
        ns.scp('hacks/grow.js', server);
        ns.scp('hacks/growweak.js', server);
        ns.scp('hacks/growhack.js', server);
        ns.scp('max_threads_helper.js', server);
        ns.scp('max_threads.js', server);
        ns.scp('sec_first.js', server);

        ns.scp('pservs/cost_server.js', server);
        ns.scp('pservs/upgrade_server.js', server);
        ns.scp('threads_share.js', server);
        ns.scp('share.js', server);

        ns.scp('controller/grow.js', server);
        ns.scp('controller/hack.js', server);
        ns.scp('controller/weaken.js', server);
        ns.scp('controller/controller.js', server);

        success.push(server);
    } // end loop

    ns.tprint('Sent scripts to pservs');
    return 1;
}
