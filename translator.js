const lookup = require('./files/lookup.json')
const pluralize = require('pluralize')

const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

translations = (original) => {
  let word = original.trim().toLowerCase()

  if (lookup[word]) return lookup[word]

  // Attempt to pluaralize.
  if (pluralize.isPlural(word)) {
    word = pluralize.singular(word)
    if (lookup[word]) return lookup[word]
  }

  // Attempt to un-conjugate verb.
  if (word.indexOf('ing') !== -1) {
    let verb = word.substr(0, word.length - 3);
    // eating -> eat
    if (lookup[verb]) return lookup[verb]
    // dancing -> dance
    if (lookup[verb + 'e']) return lookup[verb + 'e']
    // running -> run
    let verbDoubled = verb.substr(0, verb.length - 1);
    if (lookup[verbDoubled]) return lookup[verbDoubled]
  }
}

translateWord = (original) => {
  options = translations(original)
  if (options === undefined || options.length === 0)
    return
  return options[Math.floor(Math.random() * options.length)]
}

translate = (text) => {
  let translation = ''
  let words = text.split(' ')
  for (let word of words) {
    // Get rid of punctuation at the start and end of word.
    let firstSymbol = ''
    let lastSymbol = ''

    while (SYMBOLS.indexOf(word[0]) != -1) {
      firstSymbol += word[0]
      word = word.slice(1, word.length)
    }
    while (SYMBOLS.indexOf(word[word.length - 1]) != -1) {
      lastSymbol += word[word.length - 1]
      word = word.slice(0, word.length - 1)
    }

    let translated = translateWord(word);
    if (translated) {
      translation += firstSymbol + translated + lastSymbol + ' '
    } else {
      translation += firstSymbol + word + lastSymbol +  ' '
    }
  }
  return translation
}

module.exports = {
  translate: translate
}
