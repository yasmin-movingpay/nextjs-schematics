function camelToKebab(string) {
  let result = string
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();

  return result.charAt(0) === '-' ? result.slice(1) : result;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  camelToKebab,
  capitalizeFirstLetter,
};
