const decamelize = require("decamelize");

const parseDefaultValues = (defaultValue, subfields) => {
  if (Array.isArray(defaultValue) && defaultValue.length === subfields.length) {
    // Merge the subfields and defaultValue values into an object
    // { subfield0: defaultValue[0], subfield1: defaultValue[1] }
    return Object.keys(subfields).reduce((prev, next, i) => ({ ...prev, [next]: defaultValue[i] }), {});
  }

  const allNullDefaults = Object.keys(subfields).reduce((prev, next) => ({ ...prev, [next]: null }), {});
  if (defaultValue && typeof defaultValue === "object") return { ...allNullDefaults, ...defaultValue };
  else return allNullDefaults;
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const constructSubfields = (options) => {
  // convert an array of option to an object of subfields, using option value as key, and deriving the display label from the option
  const subfields = options.reduce((prev, next) => ({ ...prev, [next]: { label: capitalize(decamelize(next, " ")) } }), {});
  return subfields;
};

module.exports = { parseDefaultValues, slugify, capitalize, constructSubfields };
