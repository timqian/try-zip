const zlib = require('zlib');

const unzip = zlib.createUnzip();
const fs = require('fs');
const inp = fs.createReadStream('/Users/timqian/Documents/javascript/try-zip/DreamHouse_Davis_Jorgenson.m3d');
// const inp = fs.createReadStream('Modelo_billing-develop.zip');
// const inp = fs.createReadStream('result.csv.zip');

const out = fs.createWriteStream('output');

inp.pipe(unzip).pipe(out);