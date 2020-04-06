/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-undef */
import * as vulnsData from '../vendors/snyk/snapshot.json'
import '../node_modules/js-library-detector/library/libraries.js'
import { getVulnerabilitiesForLibrary } from './VulnerabilitiesDetector'
const jsLibsDetection = d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests

function YWxseW91cmJhc2VhcmViZWxvbmd0b3Vz() {
  const vulnerabilitiesFound = []
  jsLibsDetection.forEach(function(jsLib) {
    const vulnerabilities = getVulnerabilitiesForLibrary(jsLib, vulnsData)
    vulnerabilitiesFound.push(...vulnerabilities)
  })

  return vulnerabilitiesFound
}
