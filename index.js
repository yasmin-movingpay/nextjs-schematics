#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Obtendo o nome do componente e o caminho do diretório
const args = minimist(process.argv.slice(2), {
  string: ['props'],
  default: {
    props: ''
  }
})

let directoryPath = args._[0]

if (!directoryPath) {
  console.error('❌ algo de errado não está certo. você esqueceu de passar o nome do componente ou o caminho do diretório!')
  
  process.exit(1)
}

let componentName = path.basename(directoryPath)

// Se a flag --view for passada, adicione "View" ao final do nome do componente
if (args.view) {
  componentName = `${componentName}View`;
}

function camelToKebab(string) {
  let result = string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

  return result.charAt(0) === '-' ? result.slice(1) : result
}

// Função para converter a primeira letra para maiúscula
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}