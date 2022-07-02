#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';

import { createCodegen } from './create_codegen';

const optionDefinitions = [
  { name: 'command', type: String, defaultOption: true },
];

const mainOptions = commandLineArgs(optionDefinitions, {
  stopAtFirstUnknown: true,
});
const argv = mainOptions._unknown || [];

/* second - parse the merge command options */
if (mainOptions.command === 'create_codegen') {
  createCodegen(argv);
}
