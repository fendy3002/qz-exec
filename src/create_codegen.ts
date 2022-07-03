import * as commandLineArgs from 'command-line-args';
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
} from 'fs';
import * as path from 'path';

const optionDefinitions = [
  { name: 'folder', alias: 'f', type: String, defaultOption: true },
];
const copyFolderContentSync = (sourcedir: string, targetdir: string) => {
  const sourceContent = readdirSync(sourcedir);
  if (!existsSync(targetdir)) {
    mkdirSync(targetdir, { recursive: true });
  }
  for (const each of sourceContent) {
    const eachPath = path.join(sourcedir, each);
    const targetEachPath = path.join(targetdir, each);
    if (lstatSync(eachPath).isDirectory()) {
      copyFolderContentSync(eachPath, targetEachPath);
    } else {
      copyFileSync(eachPath, targetEachPath);
    }
  }
};

export const createCodegen = (argv) => {
  const option = commandLineArgs(optionDefinitions, { argv });

  const workdir = path.join(process.cwd(), option.folder ?? 'codegen');
  console.log(`Creating codegen app at ${workdir}`);

  if (existsSync(workdir)) {
    const dirContent = readdirSync(workdir);
    if (dirContent && dirContent.length > 0) {
      console.error('ERROR: Destination folder is not empty, stopping...');
    }
  }
  copyFolderContentSync(
    path.join(__dirname, '..', 'assets', 'create_codegen'),
    workdir,
  );
  console.log(`DONE: created codegen app at ${workdir}`);
  console.log();
  console.log(
    [
      `To complete setup, run the following command: `,
      ``,
      `  cd ${option.folder ?? 'codegen'}`,
      `  npm install`,
      `  npm run generate`,
    ].join('\n'),
  );
};
