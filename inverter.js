const emojilib = require('emojilib')
const fsPromises = require('fs').promises

const mods = emojilib.fitzpatrick_scale_modifiers

invert = () => {
  let inverted = {}
  for (let [name, props] of Object.entries(emojilib).lib) {
    for (const keyword of props.keywords) {
      let char = props.char
      if (props.category == "flags" && keyword.length === 2)
        continue
      if (props.fitzpatrick_scale && Math.random() > 0.33) {
        const modifier = mods[Math.floor(Math.random() * mods.length)]
        char = char + modifier
      }
      if (inverted[keyword]) {
        inverted[keyword].push(char)
      } else {
        inverted[keyword] = [char]
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
