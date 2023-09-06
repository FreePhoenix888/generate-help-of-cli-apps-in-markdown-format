[![npm](https://img.shields.io/npm/v/@freephoenix888/generate-help-of-cli-apps-in-markdown-format.svg)](https://www.npmjs.com/package/@freephoenix888/generate-help-of-cli-apps-in-markdown-format)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/freephoenix888/generate-help-of-cli-apps-in-markdown-format) 

Generates help messages of CLI applications in markdown format in markdown format

# Table Of Contents
<!-- TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Quick Start](#quick-start)
  - [Bash](#bash)
- [Library](#library)
  - [Library Usage](#library-usage)

<!-- TABLE_OF_CONTENTS_END -->

# Quick Start
- Add the following to your README.md
  ```markdown
  <!-- CLI_HELP_START -->
  <!-- CLI_HELP_END -->
  ```
- Allow execution of your cli utilities. For example in bash you can do it like this
   - Bash Version
     ```bash
     find ./dist/cli/ -name "*.js" -exec chmod +x {} \;
     ```
   - Javascript version
     ```js
     const files = glob.sync(path.resolve(process.cwd(), 'dist', 'cli', "*.js"));
     const writeMode = '755'
     for (const file of files) {
       fsExtra.chmodSync(file, writeMode)
     }
     ```
- Run this javascript code
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
    filePath: `./README.md`,
  }
});
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
