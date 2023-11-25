import { commands, createQuestions, envs, execScriptSync, uncapitalize } from './utils.mjs';

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

  const uncapitalizedENV = uncapitalize(env);

  const androidCommand = commands.withENV(
    uncapitalizedENV,
    commands.withFirebase(
      uncapitalizedENV,
      commands.runCodePush('🤖 Android', env, '$ANDROID_VERSION_NAME'),
    ),
  );

  const iosCommand = commands.withENV(
    uncapitalizedENV,
    commands.withFirebase(uncapitalizedENV, commands.runCodePush('🍎 iOS', env, '$IOS_VERSION')),
  );

  if (os === 'Both') {
    execScriptSync(`${androidCommand} && ${iosCommand}`);
    return;
  }

  execScriptSync(os === '🤖 Android' ? androidCommand : iosCommand);
})();
