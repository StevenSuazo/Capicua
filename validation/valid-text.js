// making sure text is a string and isny just empty spaces
const validText = str => {
  return typeof str === 'string' && str.trim().length > 0;
}

module.exports = validText;