import { writeFileSync } from 'fs';
import { execScriptSync, loadEnvFile, getArguments } from './utils.mjs';

const setupCodePush = () => {
  const { ANDROID_APP_SECRET_KEY, IOS_APP_SECRET_KEY } = loadEnvFile('development');

  const json = JSON.stringify({ app_secret: ANDROID_APP_SECRET_KEY }, null, 2);

  const plist = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>AppSecret</key>
      <string>${IOS_APP_SECRET_KEY}</string>
    </dict>
  </plist>
  `;

  writeFileSync('android/app/src/main/assets/appcenter-config.json', json);
  writeFileSync('ios/AppCenter-Config.plist', plist);
  console.log('Setup CodePush... Done! ✨✨✨');
};

(() => {
  const [arg] = getArguments();
  if (arg === 'code-push') {
    setupCodePush();
    return;
  }
  execScriptSync(
    'yarn && git init && git branch -m main && git add . && git commit -m "chore: initial commit 🚀"',
  );
})();
