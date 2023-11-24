import {
  commands,
  createBuildQuestionCollections,
  createQuestions,
  execScriptSync,
  platformInfo,
  uncapitalize,
} from './utils.mjs';

(async () => {
  const buildVariantPrefix = {
    APK: 'assemble',
    AAB: 'bundle',
  };

  const suffixAppId = {
    Development: '.dev',
    Staging: '.stag',
    Production: '',
  };

  const { env, buildType } = await createQuestions(createBuildQuestionCollections('android'));
  const uncapitalizedENV = uncapitalize(env);

  if (platformInfo.buildTypes.android.includes(buildType)) {
    execScriptSync(
      withFirebase(
        uncapitalizedENV,
        commands.generateAndroidFile(`${buildVariantPrefix[buildType]}${env}Release`),
      ),
    );
  } else {
    execScriptSync(
      commands.withFirebase(
        uncapitalizedENV,
        commands.runAndroid(uncapitalize(`${env}${buildType}`), suffixAppId[env]),
      ),
    );
  }
})();
