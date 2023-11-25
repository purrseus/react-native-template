/* eslint-disable no-console */
import { execScriptSync, getArguments, commands } from './utils.mjs';

const writeJSONFile = `cat <<EOF > ./android/app/src/main/assets/appcenter-config.json
{
  "app_secret": "$ANDROID_APP_SECRET_KEY"
}
EOF
`;

const writePlistFile = `cat <<EOF > ./ios/AppCenter-Config.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>AppSecret</key>
    <string>$IOS_APP_SECRET_KEY</string>
  </dict>
</plist>
EOF
`;

const setupCodePush = () => {
  execScriptSync(commands.withENV('development', writeJSONFile));
  execScriptSync(commands.withENV('development', writePlistFile));
  console.log('Setup CodePush... Done! ✨✨✨');
};

(() => {
  const [arg] = getArguments();
  if (arg === 'code-push') {
    setupCodePush();
    return;
  }
  execScriptSync(
    'cp ./environments/.env.development .env && yarn && git init && git branch -m main && git add . && git commit -m "chore: initial commit 🚀"',
  );
})();
