const emojilib = require('emojilib').lib
const fsPromises = require('fs').promises

invert = () => {
  let inverted = {}
  for (let [name, props] of Object.entries(emojilib)) {
    for (const keyword of props.keywords) {
      if (inverted[keyword]) {
        inverted[keyword].push(props.char)
      } else {
        inverted[keyword] = [props.char]
      }
    }
  }
  return inverted
}

invertToFile = async (path) => {
  let handle
  try {
    handle = await fsPromises.open(path, 'w')
    const inverted = invert()
    await handle.writeFile(JSON.stringify(inverted))
  } finally {
    if (handle != undefined)
      await handle.close()
  }
}

module.exports = {
  invert: invert,
  invertToFile: invertToFile
}
