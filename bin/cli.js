#!/usr/bin/env node
/* eslint-disable no-process-exit */

const args = require('minimist')(process.argv.slice(2))
const path = require('path')
const { createJSBundle } = require('../scripts/build-bundle-global')

if (args.global && args.outfile) {
  let outputFilepath = path.join(process.cwd(), args.outfile)

  createJSBundle({
    outputFilepath
  }).then(() => {
    console.log()
    console.log(`JavaScript bundle created in: ${outputFilepath}`)
    console.log(`Finished!`)
  })
} else {
  console.error(`Incorrect arguments provided`)
  console.error(`Example: js-vulns-detector --global --outfile bundle.js`)
  process.exit(1)
}
