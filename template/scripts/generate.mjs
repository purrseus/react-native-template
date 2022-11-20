import { execScriptSync, getArguments } from './utils.mjs';

(() => {
  const folderNames = ['components', 'containers', 'screens', 'services', 'utilities'];
  const [featureName, _targetPath = ''] = getArguments();
  if (!featureName) throw new SyntaxError('Missing folder name!');
  const featurePath = './src/features/';
  const targetPath = featurePath + _targetPath.replace(/\/+$/g, '');

  execScriptSync(
    folderNames.reduce((command, folderName, index) => {
      const dirPath = `${targetPath}/${featureName}/${folderName}`;
      const filePath = `${dirPath}/.gitkeep`;

      return (
        command +
        `${
          !index ? `mkdir -p ${targetPath}/${featureName}` : ''
        } && mkdir ${dirPath} && touch ${filePath}`
      );
    }, ''),
  );
})();
