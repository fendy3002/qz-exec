#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commandLineArgs = require("command-line-args");
var create_codegen_1 = require("./create_codegen");
var optionDefinitions = [
    { name: 'command', type: String, defaultOption: true },
];
var mainOptions = commandLineArgs(optionDefinitions, {
    stopAtFirstUnknown: true,
});
var argv = mainOptions._unknown || [];
/* second - parse the merge command options */
if (mainOptions.command === 'create_codegen') {
    (0, create_codegen_1.createCodegen)(argv);
}
