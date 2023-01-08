import {
  commands,
  createBuildQuestionCollections,
  createQuestions,
  execScriptSync,
  getArguments,
  platformBuildTypes,
  uncapitalize,
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

  const { env, buildType } = await createQuestions(createBuildQuestionCollections('ios'));

  if (platformBuildTypes.ios.includes(buildType)) {
    openXCode();
  } else {
    execScriptSync(commands.runIos(uncapitalize(env), buildType, envShorts[env]));
  }
})();
