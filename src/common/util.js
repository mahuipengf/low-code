/**
* shell 的类名前缀不一定和本组件一致，
* 如果有 shellClsPrefix 的话，通过 shellClsPrefix 获取到更靠谱的类名前缀
* @returns {string}
*/
export function getShellPrefix() {
 const prefix = 'next-';
 if (window.shellClsPrefix) return window.shellClsPrefix;
 return prefix;
}