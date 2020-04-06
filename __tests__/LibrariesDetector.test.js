import { collectLibraries } from '../src/LibrariesDetector'

describe('Libraries detector', () => {
  test('Detect a library returns a list of them', async () => {
    const jsLibs = {
      jQuery: {
        id: 'jquery',
        npm: 'jquery',
        icon: 'jquery',
        url: 'http://jquery.com',
        test: function(window) {
          return Promise.resolve({
            version: '1.2.3'
          })
        }
      }
    }
    const libraries = await collectLibraries({ jsLibs, window: {} })
    expect(libraries).toEqual([
      {
        id: 'jquery',
        name: 'jQuery',
        version: '1.2.3',
        npm: 'jquery'
      }
    ])
  })

  test('Detect a library returns an empty array if no match', async () => {
    const jsLibs = {
      jQuery: {
        id: 'jquery',
        npm: 'jquery',
        icon: 'jquery',
        url: 'http://jquery.com',
        test: function(window) {
          return Promise.resolve(false)
        }
      }
    }
    const libraries = await collectLibraries({ jsLibs, window: {} })
    expect(libraries).toEqual([])
  })
})
