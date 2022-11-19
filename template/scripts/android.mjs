import {
  commands,
  createBuildQuestionCollections,
  createQuestions,
  execScriptSync,
  platformBuildTypes,
  uncapitalized,
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

  if (platformBuildTypes.android.includes(buildType)) {
    execScriptSync(commands.generateAndroidFile(`${buildVariantPrefix[buildType]}${env}Release`));
  } else {
    execScriptSync(commands.runAndroid(uncapitalized(`${env}${buildType}`), suffixAppId[env]));
  }
})();
