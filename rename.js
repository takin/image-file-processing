"use strict";
exports.__esModule = true;
var fs = require("fs");
function Rename(path, ext, excludes, overwrite) {
  var files = fs.readdirSync(path, "utf-8");
  files.forEach(function(file) {
    var newPath = path + "/" + file;
    if (fs.statSync(newPath).isDirectory()) {
      return Rename(newPath, ext, excludes, overwrite);
    }
    //  jika buka direktori, maka masukkan file tersebut ke dalam array
    // hanya file yang tidak berakhiran .gstmp
    var regexmatches = excludes.filter(function(exclude) {
      var ptrn = new RegExp("." + exclude);
      var res = newPath.match(ptrn) !== null;
      return res;
    });

    if (regexmatches.length === 0) {
      console.log("go here");
      var newFileName = newPath;
      if (overwrite) {
        newFileName = newPath.replace(/\.jpe?g*/i, "");
      }
      console.log(newPath, newFileName);
      fs.renameSync(newPath, `${newFileName}${ext}`);
    }
  });
}
var entryPath = process.argv[2] || ".";
Rename(entryPath, ".jpeg", ["gstmp", "DS_Store", "js", "ts"], true);
