const moji = require('moji-translate')
const fsPromises = require('fs').promises
const cheerio = require('cheerio')

module.exports = {
  emojifyPath: async (file) => {
    let readhandle
    let writehandle
    try {
      readhandle = await fsPromises.open(file, 'r')
      const body = await readhandle.readFile()
      const $ = cheerio.load(body)
      $(':not(:has(*))').map((i, el) => {
        $el = $(el)
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
