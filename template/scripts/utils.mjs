import { execSync } from 'child_process';
import inquirer from 'inquirer';
import appInfo from '../app.json' assert { type: 'json' };

const appCenter = {
  ownerName: '<Your_owner_name>',
  appName: {
    '🤖 Android': '<Your_Android_app_name>',
    '🍎 iOS': '<Your_iOS_app_name>',
  },
};

const gitBranches = {
  Development: 'develop',
  Staging: 'staging',
  Production: 'main',
};

export const platformInfo = {
  name: {
    android: '🤖 Android',
    ios: '🍎 iOS',
  },
  buildTypes: {
    android: ['APK', 'AAB'],
    ios: ['Archive'],
  },
};

const ensureGitBranch = env => {
  const currentBranchName = execSync('git branch --show-current', {
    encoding: 'utf-8',
  }).replace('\n', '');

  if (gitBranches[env] !== currentBranchName) throw new Error('Invalid branch!');
};

export const envs = ['Development', 'Staging', 'Production'];

export const execScriptSync = command => execSync(command, { stdio: 'inherit' });

export const createQuestions = async questions => {
  const answers = await inquirer.prompt(questions);
  const isCodePush = !answers.buildType && !!answers.env;
  const isReleaseBuildType = !!answers.buildType && answers.buildType !== 'Debug';
  if (isReleaseBuildType || isCodePush) ensureGitBranch(answers.env);
  return answers;
};

export const uncapitalize = text =>
  typeof text !== 'string' || !text.length ? '' : `${text[0].toLowerCase()}${text.slice(1)}`;

export const getArguments = () => process.argv.slice(2);

export const createBuildQuestionCollections = platform => [
  {
    type: 'list',
    name: 'env',
    message: `[${platformInfo.name[platform]}] Select the environment you want to use:`,
    choices: envs,
  },
  {
    type: 'list',
    name: 'buildType',
    message: `[${platformInfo.name[platform]}] Select the build type you want to use:`,
    choices: ['Debug', 'Release'].concat(platformInfo.buildTypes[platform]),
  },
];

export const commands = {
  generateFirebaseConfigFile(env) {
    return 'echo "Running..."';
    // return `cp firebase/${env}/google-services.json android/app/google-services.json && cp firebase/${env}/GoogleService-Info.plist ios/GoogleService-Info.plist`;
  },
  withENV(envSuffix, command) {
    return `(source ./environments/.env.${envSuffix} && ${command})`;
  },
  withFirebase(env, command) {
    return `${this.generateFirebaseConfigFile(env)} && ${command}`;
  },
  runAndroid(buildVariant, suffixAppId) {
    return `yarn react-native run-android --mode ${buildVariant} --appId com.${appInfo.name.toLowerCase()}${suffixAppId}`;
  },
  generateAndroidFile(buildVariant) {
    return `cd android && ./gradlew clean && ./gradlew ${buildVariant} && cd ..`;
  },
  runIos(env, buildType, envShort) {
    return `ENVFILE=environments/.env.${env} yarn react-native run-ios --configuration '${buildType} (${envShort})' --scheme '${appInfo.name} (${envShort})'`;
  },
  openXCode() {
    return 'xed -b ios';
  },
  runCodePush(os, env, version) {
    return `appcenter codepush release-react -a ${appCenter.ownerName}/${appCenter.appName[os]} -d ${env} -t ${version} -m`;
  },
};
