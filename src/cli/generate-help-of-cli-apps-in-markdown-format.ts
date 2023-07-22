#!/usr/bin/env node
import yargs from 'yargs';
import { generateHelpOfCliAppsInMarkdownFormat } from '../generate-help-of-cli-apps-in-markdown-format.js';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .usage(`$0 [Options]`, `Generates help messages of CLI applications in markdown format`)
  .option('cli-app-file-paths', {
    description: 'Paths of CLI utility files',
    type: 'string',
    array: true,
    demandOption: true
  })
  .option('root-header-level', {
    description: 'Header level of the root header. Example: If you want generated headers to have 4 hashes, then specify 3 here',
    type: 'number',
    default: 2,
  })
  .help()
  .parseSync();

generateHelpOfCliAppsInMarkdownFormat({
  ...argv
}).then(console.log);
