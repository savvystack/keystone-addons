module.exports = {
  parseDefaultValues: (defaultValue, options) => {
    if (defaultValue && options && defaultValue.length === options.length) {
      // Merge the options and defaultValue values into an object
      // { 0: false, 1: false }
      defaultValue = options.reduce((prev, next, i) => ({ ...prev, [i]: defaultValue[i] }), {});
    } else {
      // { 0: null, 1: null }
      defaultValue = options.reduce((prev, next, i) => ({ ...prev, [i]: null }), {});
    }
    return defaultValue;
  },

  slugify: (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  },

  capitalize: (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
};
