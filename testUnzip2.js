const unzip = require('node-unzip-2');
const fs = require('fs');

// var pathToZip = "DreamHouse_Davis_Jorgenson.m3d";
// var pathToZip = "Modelo_billing-develop.zip";
var pathToZip  = "rac_advanced_sample_project.m3d";

fs.createReadStream(pathToZip)
    .pipe(unzip.Extract({ path: 'hi' }))
    .on('close', () => {
        console.log('closed', fs.readdirSync('hi'));
    });

// var workspace = 'ho';
// fs.createReadStream(pathToZip).pipe(unzip.Parse()).on("entry", function(entry) {
//     try {
//         var filePath = entry.path;
//         var fileName = path.basename(filePath);
//         var extName = path.extname(fileName).toLowerCase();

//         // As converter only recognizes ASCII filenames, 
//         // rename the file if it is not.
//         var isAncii = /^[\x00-\x7F]+$/.test(fileName);
//         if (!isAncii) {
//             var now = new Date();
//             fileName = 'f' + now.getTime() + extName;
//         }

//         // Filter out all directories and file under directories.
//         // only accept the pathname begin with "0-9" or "a-zA-Z"
//         // only accept the filename begin without "."
//         if (entry.type === "Directory" || 
//             /^[^0-9a-zA-Z].*$/.test(filePath) || 
//             fileName[0] === '.' ||
//             !unzippedFileValid(extName)) {
//             entry.autodrain();
//         } else {
//             var filePath = path.join(workspace, fileName);
//             filePaths.push(filePath)
//             entry.pipe(fs.createWriteStream(filePath));
//         }
//     } catch(err) {
//         console.log(err);
//     }
// }).on("close", function () {
//     process.nextTick(function () {
//         console.log(filePaths);
//     })
// }).on("error", function (err) {
//     console.log(err);
// });