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

