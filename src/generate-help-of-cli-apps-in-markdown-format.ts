import path from 'path';
import {execa} from 'execa';
import fsExtra from 'fs-extra'

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
  // Set default options
  const {
    cliAppFilePaths: cliAppFilePaths,
    rootHeaderLevel = 2
  } = options;

  // Prepare a place to collect all help messages
  let allHelpMessages = ``;

  // Process each CLI utility file
  for (const cliAppFilePath of cliAppFilePaths) {
    // Run the utility with '--help' to get its help message
    const { stdout: helpMessage } = await execa(cliAppFilePath, ['--help']);

    // Get the base name of the utility file (without path)
    const cliUtilityFileNameWithExtension = path.basename(cliAppFilePath);
    const cliUtilityFileNameWithoutExtension = path.basename(cliAppFilePath, path.extname(cliAppFilePath));

    // Format the help message and add it to all help messages
    allHelpMessages += `
${`#`.repeat(rootHeaderLevel+1)} \`${cliUtilityFileNameWithoutExtension}\`
\`\`\`
${helpMessage.replace(cliUtilityFileNameWithExtension, cliUtilityFileNameWithoutExtension)}
\`\`\`
`;
  }

  if(options.output) {
    if(options.output.writeMode === 'replace-placeholder') {
      const placeholderStart = options.output.placeholder.start;
      const placeholderEnd = options.output.placeholder.end;
      const placeholderRegex = new RegExp(`${placeholderStart}[\S\s]*${placeholderEnd}`, 'g');
      const filePath = options.output.filePath;
      const markdown = fsExtra.readFileSync(filePath, 'utf-8');
      const newFileContents = markdown.replace(placeholderRegex, `${placeholderStart}\n${allHelpMessages}\n${placeholderEnd}`);
      fsExtra.writeFileSync(filePath, newFileContents)
    } else  {
      const fileContents = fsExtra.readFileSync(options.output.filePath, 'utf-8');
      if(options.output.writeMode === 'append') {
        fsExtra.appendFileSync(options.output.filePath, `${fileContents}\n${allHelpMessages}`)
      } else if(options.output.writeMode === 'overwrite') {
        fsExtra.writeFileSync(options.output.filePath, allHelpMessages)
      }
    }
  }

  return allHelpMessages
}
