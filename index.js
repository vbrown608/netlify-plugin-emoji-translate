const globby = require('globby')
const plugin = require('./plugin')

module.exports = {
  onPostBuild: async ({
    constants: { PUBLISH_DIR },
  }) => {
    const htmlFiles = `${PUBLISH_DIR}/**/**.html`
    const paths = await globby(lookup)
    paths.map(plugin.emojifyPath)
  },
}
