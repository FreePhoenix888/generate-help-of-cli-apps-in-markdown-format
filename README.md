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
<!-- TABLE_OF_CONTENTS_END -->

# What can it be used for?
You can generate usage ways of CLI application and put them into your README.md file. This way you will always have up to date documentation of your CLI application in your README.md file.

# Quick Start
## Pre-requisites
- Add the following to your README.md
  ```markdown
  <!-- CLI_HELP_START -->
  <!-- CLI_HELP_END -->
  ```
- Allow execution of your cli utilities. For example in bash you can do it like this
  ```bash
  find ./dist/cli/ -name "*.js" -exec chmod +x {} \;
  ```
## JavaScript
Run this javascript code
```javascript
import {readFileSync, writeFileSync} from 'fs';
import {generateHelpOfCliAppsInMarkdownFormat} from '@freephoenix888/generate-help-of-cli-apps-in-markdown-format';

const cliAppFilePaths = ['./dist/cli/name.js'/* You need to specify the paths here or get them from elsewhere. */]; // If you build your typescript files into dist/cli folder then you can use this code to get the paths: await glob(`./dist/cli/*.js`, {absolute: true})
const generatedHelpOfCliApps = generateHelpOfCliAppsInMarkdownFormat({
  cliAppFilePaths,
  output: {
    writeMode: 'replace-placeholder',
    placeholder: {
      start: `<!-- CLI_HELP_START -->`,
      end: `<!-- CLI_HELP_END -->`,
    },
    filePath: readmeFilePath
  }
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
find ./dist/cli/ -name "*.js" -exec chmod +x {} \;
cli_help=$(npx --yes @freephoenix888/generate-help-of-cli-apps-in-markdown-format --cli-app-file-paths $(find ./dist/cli/*.js) --root-header-level 2)
pattern="(<!-- CLI_HELP_START -->)[\\S\\s]*(<!-- CLI_HELP_END -->)"
replacement=$'$1\n'"${cli_help}"$'\n$2'
npx --yes replace "$pattern" "$replacement" README.md
```

# Library
## Library Usage
See [Documentation] for examples and API


[Documentation]: https://freephoenix888.github.io/generate-help-of-cli-apps-in-markdown-format/