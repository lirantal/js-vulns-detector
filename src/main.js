import semver from 'semver'
import * as vulnsData from '../vendors/snyk/snapshot.json'
import '../node_modules/js-library-detector/library/libraries.js'

const jsLibsDetection = d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests

function getVulnerabilitiesForLibrary(jsLib, vulnsData) {
  const vulnerabilitiesFound = []
  const jsLibName = jsLib.npm
  if (!vulnsData || !vulnsData.npm || !vulnsData.npm[jsLibName]) {
    return []
  }

  const jsLibVersion = jsLib.version

  const jsLibTotalVulns = vulnsData.npm[jsLibName]
  jsLibTotalVulns.forEach(function(vulnInfo) {
    const vulnerableId = vulnInfo.id
    const vulnerableSeverity = vulnInfo.severity
    const vulnerableRange = vulnInfo.semver.vulnerable

    let isVulnerable = false
    vulnerableRange.forEach(function(semverRangeVulnerable) {
      isVulnerable = semver.satisfies(jsLibVersion, semverRangeVulnerable)
    })

    if (isVulnerable) {
      vulnerabilitiesFound.push({
        name: jsLibName,
        severity: vulnerableSeverity,
        version: jsLibVersion,
        url: `https://snyk.io/vuln/${vulnerableId}`
      })
    }
  })

  return vulnerabilitiesFound
}

function YWxseW91cmJhc2VhcmViZWxvbmd0b3Vz() {
  let vulnerabilitiesFound = []
  jsLibsDetection.forEach(function(jsLib) {
    const vulnerabilities = getVulnerabilitiesForLibrary(jsLib, vulnsData)
    vulnerabilitiesFound.push(...vulnerabilities)
  })

  return vulnerabilitiesFound
}
