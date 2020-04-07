/* eslint-disable no-undef */
/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

const OUTPUT_FILE_PATH = path.join(__dirname, '../', 'dist', 'bundle-global.js')
const INPUT_FILE_PATH = path.join(__dirname, '../', 'src/main.js')

async function transpileJSBundle({ inputOptions, outputOptions }) {
  const bundle = await rollup.rollup(inputOptions)
  const { output } = await bundle.generate(outputOptions)
  return output
}

async function createJSBundle({ outputFilepath }) {
  if (!outputFilepath) {
    outputFilepath = OUTPUT_FILE_PATH
  }

  const inputOptions = {
    input: INPUT_FILE_PATH,
    treeshake: false,
    plugins: [json(), resolve(), commonjs()]
  }

  const outputOptions = {
    output: {
      format: 'esm'
    }
  }

  const bundleData = await transpileJSBundle({ inputOptions, outputOptions })
  let codeAsString = ''

  for (const chunk of bundleData) {
    if (chunk.type === 'chunk' && chunk.code) {
      codeAsString += chunk.code
    }
  }

  codeAsString += ';\nreturn YWxseW91cmJhc2VhcmViZWxvbmd0b3Vz();'
  fs.writeFileSync(outputFilepath, codeAsString)
}

module.exports = {
  createJSBundle
}
