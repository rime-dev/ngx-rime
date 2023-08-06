import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {execSync} from 'child_process';

const libs = ['util', 'ui', 'feature', 'data-access'];

const nxClearCache = (): Rule => {
  execSync('nx clear-cache', {stdio: 'inherit'});
  return () => {};
};
const lintLibs = (): Rule => {
  execSync(
    'nx workspace-lint && nx run-many --projects=data-access,feature,ui,util --target=lint',
    {stdio: 'inherit'}
  );
  return () => {};
};
const testLibs = (): Rule => {
  execSync(
    'nx run-many --projects=data-access,feature,ui,util --target=test --browsers ChromeHeadless',
    {stdio: 'inherit'}
  );
  return () => {};
};
const buildLibs = (): Rule => {
  execSync('nx run-many --projects=data-access,feature,ui,util --target=build', {stdio: 'inherit'});
  return () => {};
};
const publishLibs = (version: string): Rule => {
  libs.forEach((lib: string) => {
    let command = '';
    command += 'cd dist/libs/' + lib;
    command += '&&';
    //command += `npm version ${version}`;
    //command += '&&';
    command += 'npm pack';
    command += '&&';
    command += 'npm publish';
    execSync(command, {stdio: 'inherit'});
  });
  return () => {};
};

export default function (tree: Tree, schema: Record<string, never>) {
  const version = String(schema.version);
  if (!version) {
    return;
  }
  console.log('Verion: ', version);
  return chain([nxClearCache(), lintLibs(), testLibs(), buildLibs(), publishLibs(version)]);
}

/*
    "npm_publish_util": "cd dist/libs/util && npm version 0.1.2 && npm pack && npm publish",
    "npm_publish_ui": "cd dist/libs/ui && npm version 0.1.2 && npm pack && npm publish",
    "npm_publish_feature": "cd dist/libs/feature && npm version 0.1.2 && npm pack && npm publish",
    "npm_publish_data_access": "cd dist/libs/data-access && npm version 0.1.2 && npm pack && npm publish",
*/
