import path from 'path';
import {execa} from 'execa';

export interface generateHelpOfCliAppsInMarkdownFormatOptions {
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
}

/**
 * Generates help messages of CLI applications in markdown format
 */
export async function generateHelpOfCliAppsInMarkdownFormat(options: generateHelpOfCliAppsInMarkdownFormatOptions): Promise<string> {
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
    const cliUtilityFileName = path.basename(cliAppFilePath, path.extname(cliAppFilePath));

    // Format the help message and add it to all help messages
    allHelpMessages += `
${`#`.repeat(rootHeaderLevel+1)} \`${cliUtilityFileName}\`
\`\`\`
${helpMessage.replace(cliUtilityFileName, cliUtilityFileName)}
\`\`\`
`;
  }

  return allHelpMessages
}
