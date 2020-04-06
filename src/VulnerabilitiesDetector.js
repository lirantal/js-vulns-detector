/* eslint-disable security/detect-object-injection */
/* eslint-disable node/no-unpublished-import */
import semver from 'semver'

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

export { getVulnerabilitiesForLibrary }
