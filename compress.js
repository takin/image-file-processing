const imagemin = require("imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const gm = require("imagemin-gm");
const imageminGm = new gm();
const fs = require("fs");
const path = require("path");

const Walker = require("./file-walker");
