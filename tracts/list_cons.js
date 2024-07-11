import { findHelper } from 'helper/find_servers.js';

/** @param {NS} ns */
export async function main(ns) {
    //ns.tprint(ns.codingcontract.getContractTypes());
    
    let serverList = findHelper(ns);
    let num = 0;
    for (let server of serverList) {
        let contracts = ns.ls(server, '.cct');
        for (let c of contracts) {
            ns.tprint(server + ' has contract ' + c
                + ' [' + ns.codingcontract.getContractType(c, server) + ']');
            num++;
        }
    }
    if (num == 0) ns.tprint('no contracts found');

    // "Shortest Path in a Grid"
}



/*
["Find Largest Prime Factor",
"Subarray with Maximum Sum",
"Total Ways to Sum",
"Total Ways to Sum II",
"Spiralize Matrix",
"Array Jumping Game",
"Array Jumping Game II",
"Merge Overlapping Intervals",
"Generate IP Addresses",
"Algorithmic Stock Trader I",
"Algorithmic Stock Trader II",
"Algorithmic Stock Trader III",
"Algorithmic Stock Trader IV",
"Minimum Path Sum in a Triangle",
"Unique Paths in a Grid I",
"Unique Paths in a Grid II",
"Shortest Path in a Grid",
"Sanitize Parentheses in Expression",
"Find All Valid Math Expressions",
"HammingCodes: Integer to Encoded Binary",
"HammingCodes: Encoded Binary to Integer",
"Proper 2-Coloring of a Graph",
"Compression I: RLE Compression",
"Compression II: LZ Decompression",
"Compression III: LZ Compression",
"Encryption I: Caesar Cipher",
"Encryption II: Vigenère Cipher"]
*/