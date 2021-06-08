//
// Validate that the input is alphabetical with a lenght of 2 or more words, and at least 1 character each word
//
function validateAlphaInput(input) {
  let message = "Please enter one or more words with letters only";
  if (input.length > 0) {
    return input.match(/^[a-zA-Z]\w*/g) ? true : message;
  } else return message;
}
//
// Validate that the input is numeric with a lenght of 2 or more words, and at least 1 character each word
//
function validateNumericInput(input) {
  let message = "Please enter one or more digits without spaces";
  if (input.length > 0) {
    return input.match(/^[0-9]\w*/g) ? true : message;
  } else return message;
}
//
module.exports = { validateAlphaInput, validateNumericInput };
//
