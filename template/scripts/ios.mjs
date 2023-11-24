import {
  commands,
  createBuildQuestionCollections,
  createQuestions,
  execScriptSync,
  getArguments,
  platformInfo,
  uncapitalize,
} from './utils.mjs';

(async () => {
  const envShorts = {
    Development: 'dev',
    Staging: 'stag',
    Production: 'prod',
  };

  const [arg] = getArguments();

  if (arg === 'xcode') {
    execScriptSync(commands.openXCode());
    return;
  }

  const { env, buildType } = await createQuestions(createBuildQuestionCollections('ios'));
  const uncapitalizedENV = uncapitalize(env);

  if (platformInfo.buildTypes.ios.includes(buildType)) {
    execScriptSync(commands.openXCode());
  } else {
    execScriptSync(
      commands.withFirebase(
        uncapitalizedENV,
        commands.runIos(uncapitalizedENV, buildType, envShorts[env]),
      ),
    );
  }
})();
