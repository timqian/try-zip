var yauzl = require("yauzl");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp"); // or similar

var pathToZip = "DreamHouse_Davis_Jorgenson.m3d";
// var pathToZip = "Modelo_billing-develop.zip";
// var pathToZip = "rac_advanced_sample_project.m3d";
// var pathToZip = "rac_basic_sample_project.m3d";

var pathToStoreFiles = 'hi'

yauzl.open(pathToZip, {lazyEntries: true}, function(err, zipfile) {
  if (err) throw err;
  zipfile.readEntry();
  zipfile.on("entry", function(entry) {
    if (/\/$/.test(entry.fileName)) {
      // directory file names end with '/'
      mkdirp(entry.fileName, function(err) {
        if (err) throw err;
        zipfile.readEntry();
      });
    } else {
      // file entry
      zipfile.openReadStream(entry, function(err, readStream) {
        if (err) throw err;
        // ensure parent directory exists
        mkdirp(path.dirname(entry.fileName), function(err) {
          if (err) throw err;
          readStream.pipe(fs.createWriteStream(entry.fileName));
          readStream.on("end", function() {
            zipfile.readEntry();
          });
        });
      });
    }
  });
});