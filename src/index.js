#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { camelToKebab, capitalizeFirstLetter } = require('./helpers/capitalizes');

function parseArguments() {
  const args = minimist(process.argv.slice(2), {
    string: ['props'],
    default: {
      props: ''
    }
  });

  if (!args._[0]) {
    console.error('❌ algo de errado não está certo. você esqueceu de passar o nome do componente ou o caminho do diretório!');
    process.exit(1);
  }

  return args;
}

function getComponentName(directoryPath, view) {
  let componentName = path.basename(directoryPath);

  if (view) {
    componentName = `${componentName}View`;
  }

  return capitalizeFirstLetter(componentName);
}

function getPropsCode(props) {
  let propsCode = '';
  let propsType = '';

  if (props.length > 0) {
    propsType = `type Props = {\n${props.join(';\n')}\n};\n`;

    let propsNames = props.map(prop => prop.split(':')[0].trim());

    propsCode = `({ ${propsNames.join(', ')} }: Props)`;
  }

  return { propsCode, propsType };
}

function createComponentTemplate(componentName, propsCode, propsType) {
  return `'use client';

${propsType}
export default function ${componentName}${propsCode} {
  return (
      <p>${componentName} works!</p>
  );
}
`;
}

function createComponentFile(directoryPath, fileName, componentTemplate) {
  if (directoryPath.endsWith('/') && !fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  } else {
    directoryPath = path.dirname(directoryPath);
  }

  fs.writeFileSync(path.join(directoryPath, fileName), componentTemplate);

  if (fs.existsSync(path.join(directoryPath, fileName))) {
    const stats = fs.statSync(path.join(directoryPath, fileName));

    console.log(`✅ [CREATE] ${directoryPath}/${fileName} (${stats.size} bytes)`);
  } else {
    console.error(`❌ [ERROR] Failed to create ${directoryPath}/${fileName}`);
  }
}

function main() {
  const args = parseArguments();

  let directoryPath = args._[0];
  let componentName = getComponentName(directoryPath, args.view);
  const fileName = `${camelToKebab(componentName)}.tsx`;

  let props = args.props.split(';').map(prop => prop.trim()).filter(Boolean);
  const { propsCode, propsType } = getPropsCode(props);

  let componentTemplate = createComponentTemplate(componentName, propsCode, propsType);

  createComponentFile(directoryPath, fileName, componentTemplate);
}

main();