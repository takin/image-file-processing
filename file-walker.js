const fs = require("fs");

const Walker = (entryPath, ext, files, excludes, encoding) => {
  encoding = encoding || "utf-8";
  files = files || [];
  ext = ext || "*";
  let promise = new Promise(resolve => {
    let walkedFiles = fs.readdirSync(entryPath, encoding);

    walkedFiles.forEach(file => {
      let currentPath = `${entryPath}/${file}`;
      try {
        if (fs.statSync(currentPath).isDirectory()) {
          return Walker(currentPath, ext, files, excludes, encoding);
        }
        let file = fs.statSync(currentPath);
        if (file.size > 0) {
          if (ext.match(/\*+/) === null) {
            if (currentPath.match("." + ext.replace(/\^./, "")) !== null) {
              files.push(currentPath);
            }
            return;
          }
          files.push(currentPath);
        }
      } catch (e) {
        console.log(e);
      }
    });

    return resolve(files);
  });

  return promise;
};

exports.walk = Walker;
exports.walkSync = (entryPath, ext, files, excludes, encoding) => {
  async function walk() {
    try {
      let files = await Walker(entryPath, ext, files, excludes, encoding);
      return files;
    } catch (e) {
      console.log(e);
    }
  }
  return walk();
};
