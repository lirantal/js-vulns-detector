/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

const targetBundleFilepath = path.join(__dirname, '../', 'dist', 'bundle-global.js')

async function transpileJSBundle({ inputOptions, outputOptions }) {
  const bundle = await rollup.rollup(inputOptions)
  const { output } = await bundle.generate(outputOptions)
  return output
}

async function createJSBundle() {
  const inputOptions = {
    input: path.join(__dirname, '../', 'src/main.js'),
    treeshake: false,
    plugins: [json(), resolve(), commonjs()]
  }

  const outputOptions = {
    output: {
      file: 'dist/bundle-base.js',
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
  fs.writeFileSync(targetBundleFilepath, codeAsString)
}

createJSBundle()
