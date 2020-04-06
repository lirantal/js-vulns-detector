import { getVulnerabilitiesForLibrary } from '../src/VulnerabilitiesDetector'

describe('Vulnerabilities Detector', () => {
  test('getVulnerabilitiesForLibrary should return an array of vulnerabilities objects', () => {
    const jsLib = {
      npm: 'angular',
      version: '1.5.0',
      id: 'angular',
      name: 'Angular'
    }

    const vulnsData = {
      npm: {
        angular: [
          {
            id: 'SNYK-JS-ANGULAR-534884',
            severity: 'high',
            semver: { vulnerable: ['>=1.4.0-beta.6 <1.7.9'] }
          }
        ]
      }
    }

    const vulns = getVulnerabilitiesForLibrary(jsLib, vulnsData)
    expect(vulns).toEqual([
      {
        name: 'angular',
        severity: 'high',
        version: '1.5.0',
        url: 'https://snyk.io/vuln/SNYK-JS-ANGULAR-534884'
      }
    ])
  })

  test('getVulnerabilitiesForLibrary should return an empty array if no vulns found', () => {
    const jsLib = {
      npm: 'angular',
      version: '1.2.0',
      id: 'angular',
      name: 'Angular'
    }

    const vulnsData = {
      npm: {
        angular: [
          {
            id: 'SNYK-JS-ANGULAR-534884',
            severity: 'high',
            semver: { vulnerable: ['>=1.4.0-beta.6 <1.7.9'] }
          }
        ]
      }
    }

    const vulns = getVulnerabilitiesForLibrary(jsLib, vulnsData)
    expect(vulns).toEqual([])
  })

  test('getVulnerabilitiesForLibrary should return an empty array if no vulns match range', () => {
    const jsLib = {
      npm: 'angular',
      version: '1.5.0',
      id: 'angular',
      name: 'Angular'
    }

    const vulnsData = {
      // npm: {}
    }

    const vulns = getVulnerabilitiesForLibrary(jsLib, vulnsData)
    expect(vulns).toEqual([])
  })
})
