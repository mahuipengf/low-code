var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var packageJSON = require('./package.json');
var version = packageJSON.version
var deepVersion = packageJSON.dependencies['@ali/deep'];
shell.rm('-rf', 'vc-shell');
shell.exec('git clone http://gitlab.alibaba-inc.com/vision-components/vc-shell.git', (code) => {
  try {
    if (code) {
      console.log('vc-shell加载失败')
    }
    console.log('vc-shell下载完成')
    shell.cd('vc-shell')
    console.log('安装依赖中……')
    shell.exec('tnpm i')
    console.log('依赖安装完成！')
    var shellPackageJSON = require('./vc-shell/package.json')
    if(version && deepVersion){
      if (toNum(version) < toNum((shellPackageJSON.version))) {
        console.error('当前版本号小于vc-shell版本号，请确认后再操作！！')
        return
      }
      shellPackageJSON.version = version;
      shellPackageJSON.dependencies['@ali/deep'] = deepVersion
      fs.writeFileSync(
        path.resolve(__dirname, './vc-shell/package.json'),
        JSON.stringify(shellPackageJSON, null, 2)
      );
      console.log('开始编译……')
      shell.exec('tnpm run build')
      console.log('编译完成！')
      shell.exec('tnpm publish --tag next')
      shell.exec('git add . ')
      shell.exec('git commit -m auto-publish')
      shell.exec('git push origin master');
      console.log("vc-shell同步发布成功，版本号：",version);
      shell.cd('..')
      shell.rm('-rf', 'vc-shell');
    }
  } catch (e) {
    console.error('同步发布vc-shell出现错误，请检查确认！！！')
  }
});

function toNum(version){
  const ver = version.split('.');
  const numPlace=["","0","00","000","0000"]
  const reverse = numPlace.reverse();
  for (let i=0;i<ver .length;i++){
    const len=ver[i].length;
    ver[i]=reverse[len]+ver [i];
  }
  return ver.join('');
}

