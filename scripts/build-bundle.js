/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs')
const path = require('path')
const sourceBundleFilepath = '../dist/bundle-base.js'
const targetBundleFilepath = '../dist/bundle-global.js'
const bundle = fs.readFileSync(path.join(__dirname, sourceBundleFilepath))

const outputString = `${bundle};

return YWxseW91cmJhc2VhcmViZWxvbmd0b3Vz();`

fs.writeFileSync(path.join(__dirname, targetBundleFilepath), outputString)
