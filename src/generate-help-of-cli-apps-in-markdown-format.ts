import path from 'path';
import {execa} from 'execa';
import fsExtra from 'fs-extra'
import debug from 'debug';

export interface BaseOutputOptions {
  /**
   * Path of the file to write the table of contents to
   */
  filePath: string;
}

export interface WriteModeOptions {
  /**
   * Write mode for the output
   */
  writeMode: 'overwrite' | 'append' | 'replace-placeholder';
}

export interface OutputOptionsWithoutPlaceholder extends BaseOutputOptions, WriteModeOptions {
  writeMode: 'overwrite' | 'append';
}

export interface Placeholder {
  /**
   * Start of the placeholder text
   */
  start: string;
  /**
   * End of the placeholder text
   */
  end: string;
}

export interface OutputOptionsWithPlaceholder extends BaseOutputOptions, WriteModeOptions {
  writeMode: 'replace-placeholder';
  placeholder: Placeholder;
}

export type OutputOptions = OutputOptionsWithoutPlaceholder | OutputOptionsWithPlaceholder;

export interface GenerateHelpOfCliAppsInMarkdownFormatOptions {
  /**
   * Paths of CLI utility files
   */
  cliAppFilePaths: Array<string>; 
  /**
   * Header level of the root header. Example: If you want generated headers to have 4 hashes, then specify 3 here
   * 
   * @defaultValue
   * 2
   */
  rootHeaderLevel?: number;
  /**
   * Output options
   */
  output?: OutputOptions;
}

/**
 * Generates help messages of CLI applications in markdown format
 */
export async function generateHelpOfCliAppsInMarkdownFormat(options: GenerateHelpOfCliAppsInMarkdownFormatOptions): Promise<string> {
  const log = debug(generateHelpOfCliAppsInMarkdownFormat.name);
  log({options})
  // Set default options
  const {
    cliAppFilePaths: cliAppFilePaths,
    rootHeaderLevel = 2
  } = options;
  log({cliAppFilePaths, rootHeaderLevel})

  // Prepare a place to collect all help messages
  let allHelpMessages = ``;

  // Process each CLI utility file
  for (const cliAppFilePath of cliAppFilePaths) {
    log({cliAppFilePath})
    // Run the utility with '--help' to get its help message
    const { stdout: helpMessage } = await execa(cliAppFilePath, ['--help']);
    log({helpMessage})

    // Get the base name of the utility file (without path)
    const cliUtilityFileNameWithExtension = path.basename(cliAppFilePath);
    log({cliUtilityFileNameWithExtension})
    const cliUtilityFileNameWithoutExtension = path.basename(cliAppFilePath, path.extname(cliAppFilePath));
    log({cliUtilityFileNameWithoutExtension})

    // Format the help message and add it to all help messages
    allHelpMessages += `
${`#`.repeat(rootHeaderLevel+1)} \`${cliUtilityFileNameWithoutExtension}\`
\`\`\`
${helpMessage.replace(cliUtilityFileNameWithExtension, cliUtilityFileNameWithoutExtension)}
\`\`\`
`;
    log({allHelpMessages})
  }
  log({allHelpMessages})

  if(options.output) {
    if(options.output.writeMode === 'replace-placeholder') {
      const placeholderStart = options.output.placeholder.start;
      log({placeholderStart})
      const placeholderEnd = options.output.placeholder.end;
      log({placeholderEnd})
      const placeholderRegex = new RegExp(`${placeholderStart}[\\S\\s]*${placeholderEnd}`, 'g');
      log({placeholderRegex})
      const filePath = options.output.filePath;
      log({filePath})
      const markdown = fsExtra.readFileSync(filePath, 'utf-8');
      log({markdown})
      const newFileContents = markdown.replace(placeholderRegex, `${placeholderStart}\n${allHelpMessages}\n${placeholderEnd}`);
      log({newFileContents})
      fsExtra.writeFileSync(filePath, newFileContents)
    } else if(options.output.writeMode === 'append') {
      fsExtra.appendFileSync(options.output.filePath, allHelpMessages)
    } else if(options.output.writeMode === 'overwrite') {
      fsExtra.writeFileSync(options.output.filePath, allHelpMessages)
    }
  }

  return allHelpMessages
}
