"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCodegen = void 0;
var commandLineArgs = require("command-line-args");
var fs_1 = require("fs");
var path = require("path");
var optionDefinitions = [
    { name: 'folder', alias: 'f', type: String, defaultOption: true },
];
var copyFolderContentSync = function (sourcedir, targetdir) {
    var sourceContent = (0, fs_1.readdirSync)(sourcedir);
    for (var _i = 0, sourceContent_1 = sourceContent; _i < sourceContent_1.length; _i++) {
        var each = sourceContent_1[_i];
        var eachPath = path.join(sourcedir, each);
        var targetEachPath = path.join(targetdir, each);
        if ((0, fs_1.lstatSync)(eachPath).isDirectory()) {
            return copyFolderContentSync(eachPath, targetEachPath);
        }
        else {
            (0, fs_1.copyFileSync)(eachPath, targetEachPath);
        }
    }
};
var createCodegen = function (argv) {
    var _a;
    var option = commandLineArgs(optionDefinitions, { argv: argv });
    var workdir = path.join(process.cwd(), (_a = option.folder) !== null && _a !== void 0 ? _a : 'codegen');
    console.log("Creating codegen app at ".concat(workdir));
    if ((0, fs_1.existsSync)(workdir)) {
        var dirContent = (0, fs_1.readdirSync)(workdir);
        if (dirContent && dirContent.length > 0) {
            console.error('Destination folder is not empty, stopping...');
        }
    }
    copyFolderContentSync(path.join(__dirname, 'createAppSource'), workdir);
};
exports.createCodegen = createCodegen;
