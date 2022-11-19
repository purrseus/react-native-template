import inquirer from 'inquirer';
import {
  commands,
  createBuildQuestionCollections,
  execScriptSync,
  getArguments,
  platformBuildTypes,
  uncapitalized,
} from './utils.mjs';

(async () => {
  const envShorts = {
    Development: 'dev',
    Staging: 'stag',
    Production: 'prod',
  };

  const [arg] = getArguments();
  const openXCode = () => execScriptSync(commands.openXcode());

  if (arg === 'xcode') {
    openXCode();
    return;
  }

  const { env, buildType } = await inquirer.prompt(createBuildQuestionCollections('ios'));

  if (platformBuildTypes.ios.includes(buildType)) {
    openXCode();
  } else {
    execScriptSync(commands.runIos(uncapitalized(env), buildType, envShorts[env]));
  }
})();
