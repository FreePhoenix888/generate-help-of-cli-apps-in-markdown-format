[![npm](https://img.shields.io/npm/v/@freephoenix888/generate-help-of-cli-apps-in-markdown-format.svg)](https://www.npmjs.com/package/@freephoenix888/generate-help-of-cli-apps-in-markdown-format)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/freephoenix888/generate-help-of-cli-apps-in-markdown-format) 

Generates help messages of CLI applications in markdown format in markdown format

# Table Of Contents
<!-- TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [What can it be used for?](#what-can-it-be-used-for)
- [Quick Start](#quick-start)
  - [Pre-requisites](#pre-requisites)
  - [JavaScript](#javascript)
  - [Bash](#bash)
- [Library](#library)
  - [Library Usage](#library-usage)
- [Cli](#cli)
  - [Cli Usage](#cli-usage)
    - [`generate-help-of-cli-apps-in-markdown-format`](#generate-help-of-cli-apps-in-markdown-format)
  - [Cli Usage Ways](#cli-usage-ways)
    - [Directly running using npx](#directly-running-using-npx)
      - [Global Installation](#global-installation)
        - [Global installation and running using binary name](#global-installation-and-running-using-binary-name)
        - [Global installation and running using npx](#global-installation-and-running-using-npx)
      - [Local installation](#local-installation)
        - [Local installation and running using npx](#local-installation-and-running-using-npx)
        - [Local installation and running using npm script](#local-installation-and-running-using-npm-script)
<!-- TABLE_OF_CONTENTS_END -->

# What can it be used for?
Generate CLI usage ways and place it in the README.md file of your npm package which provides CLI utilities
This package uses itself to do that. See [Cli Usage](#cli-usage) section below - it is generated by github action which uses this package

# Quick Start
## Pre-requisites
Add the following to your README.md
```markdown
# Cli
## Cli Usage Ways
<!-- CLI_HELP_START -->
<!-- CLI_HELP_END -->
```
## JavaScript
Run this javascript code
```javascript
import {readFileSync, writeFileSync} from 'fs';
import {generateHelpOfCliAppsInMarkdownFormat} from '@freephoenix888/generate-help-of-cli-apps-in-markdown-format';

const cliAppFilePaths = /* You need to specify the paths here or get them from elsewhere. */
const generatedHelpOfCliApps = generateHelpOfCliAppsInMarkdownFormat({
  cliAppFilePaths
});
const readme = readFileSync('README.md', 'utf8');
const pattern = /(<!-- CLI_HELP_START -->)[\S\s]*(<!-- CLI_HELP_END -->)/;
const replacement = '$1\n' + generatedHelpOfCliApps + '\n$2';
const newReadme = readme.replace(pattern, replacement);
writeFileSync('README.md', newReadme);
```
## Bash
Run this bash script
```bash
cli_help=$(npx --yes @freephoenix888/generate-help-of-cli-apps-in-markdown-format --cli-app-file-paths $(find ./dist/cli/*.js) --root-header-level 2)
pattern="(<!-- CLI_HELP_START -->)[\\S\\s]*(<!-- CLI_HELP_END -->)"
replacement=$'$1\n'"${cli_help}"$'\n$2'
npx --yes replace "$pattern" "$replacement" README.md
```

# Library
## Library Usage
See [Documentation] for examples and API
# Cli
## Cli Usage
<!-- ACTUAL_CLI_HELP_START -->

### `generate-help-of-cli-apps-in-markdown-format`
```
generate-help-of-cli-apps-in-markdown-format [Options]

Generates help messages of CLI applications in markdown format

Options:
  --version             Show version number                            [boolean]
  --cli-app-file-paths  Paths of CLI utility files            [array] [required]
  --root-header-level   Header level of the root header. Example: If you want ge
                        nerated headers to have 4 hashes, then specify 3 here
                                                           [number] [default: 2]
  --help                Show help                                      [boolean]
```
<!-- ACTUAL_CLI_HELP_END -->

## Cli Usage Ways
<!-- CLI_USAGE_WAYS_START -->
If you are going to use this package in a project - it is recommended to install it is [Locally](#local-installation)  
If you are going to use this package for yourself - it is recommended to install it [Globally](#global-installation) or run it directly using [npx](#directly-running-using-npx)
### Directly running using npx
```shell
npx --yes @freephoenix888/generate-help-of-cli-apps-in-markdown-format
```

#### Global Installation
##### Global installation and running using binary name
```shell
npm install --global @freephoenix888/generate-help-of-cli-apps-in-markdown-format
generate-help-of-cli-apps-in-markdown-format
```

##### Global installation and running using npx
```shell
npm install --global @freephoenix888/generate-help-of-cli-apps-in-markdown-format
npx generate-help-of-cli-apps-in-markdown-format
```

#### Local installation

##### Local installation and running using npx
```shell
npm install @freephoenix888/generate-help-of-cli-apps-in-markdown-format
npx generate-help-of-cli-apps-in-markdown-format
```

##### Local installation and running using npm script
```shell
npm install @freephoenix888/generate-help-of-cli-apps-in-markdown-format
```
Add npm script to package.json. Note that you can name  your script as you want but it must call binary file provided by the package
```json
{
  "scripts": {
    "generate-help-of-cli-apps-in-markdown-format": "generate-help-of-cli-apps-in-markdown-format"
  }
}
```
and run
```shell
npm run generate-help-of-cli-apps-in-markdown-format
```
<!-- CLI_USAGE_WAYS_END -->


[Documentation]: https://freephoenix888.github.io/generate-help-of-cli-apps-in-markdown-format/