module.exports = {
  // combine options and defaultValue into a `value` object
  // options is an array of objects, with `value` and `label` props
  // defaultValue can be a simple value, or an array of simple values (only valid if config.exclusive == false)
  makeInitialValue: (defaultValue, options) => {
    return {
      options,
      selected: defaultValue,
    }
  },

  slugify: (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  },

  capitalize: (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  },
}
