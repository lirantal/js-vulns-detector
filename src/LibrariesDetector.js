// d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests
async function collectLibraries({ jsLibs, window }) {
  const libraries = []
  for (const [name, lib] of Object.entries(jsLibs)) {
    try {
      const result = await lib.test(window)
      if (result) {
        libraries.push({
          id: lib.id,
          name: name,
          version: result.version,
          npm: lib.npm
        })
      }
    } catch (e) {}
  }

  return libraries
}

export { collectLibraries }
