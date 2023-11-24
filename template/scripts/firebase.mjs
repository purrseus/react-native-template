import inquirer from 'inquirer';
import { envs, execScriptSync, commands, uncapitalize } from './utils.mjs';

(async () => {
  const { env } = await inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      message: '[🔥 Firebase] Select the environment you want to use:',
      choices: envs,
    },
  ]);

  execScriptSync(commands.generateFirebaseConfigFile(uncapitalize(env)));
})();
