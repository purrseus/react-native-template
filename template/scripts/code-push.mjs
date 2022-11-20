import {
  commands,
  createQuestions,
  envs,
  execScriptSync,
  loadEnvFile,
  uncapitalized,
} from './utils.mjs';

(async () => {
  const { os, env } = await createQuestions([
    {
      type: 'list',
      name: 'os',
      message: 'Select the OS to release:',
      choices: ['🤖 Android', '🍎 iOS', 'Both'],
    },
    {
      type: 'list',
      name: 'env',
      message: 'Select the environment you want to release:',
      choices: envs,
    },
  ]);

  const { ANDROID_VERSION_NAME, IOS_VERSION } = loadEnvFile(uncapitalized(env));

  const androidCommand = commands.codePush('🤖 Android', env, ANDROID_VERSION_NAME);
  const iosCommand = commands.codePush('🍎 iOS', env, IOS_VERSION);

  if (os === 'Both') {
    execScriptSync(`${androidCommand} && ${iosCommand}`);
    return;
  }

  execScriptSync(os === '🤖 Android' ? androidCommand : iosCommand);
})();
