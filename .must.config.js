// more config: http://gitlab.alibaba-inc.com/parrot/parrot-tool-must/blob/master/doc/config.md
const translate = require('@ali/translate');

module.exports = {
  extract: {
    name: 'vc-deep',
    sourcePath: 'src',
    fileType: 'js',
    prettier: true,
    translator: translate.google,
    macro: {
      path: 'src/i18n',
      method: '$i18n.get({id:"$key$", dm:"$defaultMessage$"})',
      import: 'import $i18n from "src/i18n/index"',
      keySplitter: '.',
      dependencies: [
        '@ali/intl-common-info',
        '@ali/intl-universal',
        'prop-types',
      ],
      keyGenerator: (enCopy, filePath, config) => {
        enCopy = typeof enCopy === 'string' ? enCopy : enCopy['en-US'];
        const words = enCopy.split(/[^a-zA-Z]/i);
        const namedWords = words.filter(w => /^[\w|\d]+$/i.test(w))
          .map(w => w.replace(/(?:^|\s)\S/g, a => a.toUpperCase()));

        if (namedWords.length === 0) {
          return '';
        }

        let nameWords = (config.name).split('-');
        nameWords.shift();
        nameWords = nameWords.splice(0, 2);
        if (nameWords && nameWords[1]) {
          nameWords[1] = nameWords[1].replace(nameWords[1][0], nameWords[1][0].toUpperCase());
        }

        return nameWords.concat(namedWords.slice(0, 4)).join('');
      },
    },
    // 只提取prototype.js相关的文案
    exclude: path => !/prototype.js|inlineProtos.js|prototypeConfig.js$/ig.test(path),
    matchCopy: (text, path) => {
      const isZhKey = /^zh_CN:|en_US:|initialValue:|url:|source:\s?/ig.test(path.parentPath.toString());
      return /[^\x00-\xff]/.test(text) && !isZhKey; // eslint-disable-line
    },
    babel: {
      allowImportExportEverywhere: true,
      decoratorsBeforeExport: true,
      plugins: [
        'asyncGenerators',
        'classProperties',
        'decorators-legacy',
        'doExpressions',
        'exportExtensions',
        'exportDefaultFrom',
        'typescript',
        'functionSent',
        'functionBind',
        'jsx',
        'objectRestSpread',
        'dynamicImport',
        'numericSeparator',
        'optionalChaining',
        'optionalCatchBinding',
      ],
    },
    isNeedUploadCopyToMedusa: true,
    medusa: {
      appName: 'VC-Deep', // 美杜莎应用名称
      tag: 'vc-deep',
    },
    sourceLang: 'zh-CN',
  },
  import: {
    type: 'json',
    path: 'src/i18n/strings',
    medusa: {
      appName: 'VC-Deep', // 美杜莎应用名称
      tag: 'vc-deep',
    },
  },
};
