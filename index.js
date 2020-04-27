const moji = require('moji-translate')
const globby = require('globby')
const fsPromises = require('fs').promises
const cheerio = require('cheerio')

module.exports = {
  onPostBuild: async ({
    constants: { PUBLISH_DIR },
  }) => {
    const htmlFiles = `${PUBLISH_DIR}/**/**.html`
    const paths = await globby(lookup)
    paths.map(emojifyPath)

  },
  emojifyPath: async (file) => {
    let readhandle
    let writehandle
    try {
      readhandle = await fsPromises.open(file, 'r')
      const body = await readhandle.readFile()
      const $ = cheerio.load(body)
      $(':not(:has(*))').map((i, el) => {
        $el = $(el)
        console.log(moji.translate($el.text()))
        $el.text(moji.translate($el.text()))
      })
      writehandle = await fsPromises.open(file, 'w')
      await writehandle.writeFile($.root().html())
    } finally {
      if (readhandle !== undefined)
        await readhandle.close();
      if (writehandle !== undefined)
        await writehandle.close();
    }
  },
}
