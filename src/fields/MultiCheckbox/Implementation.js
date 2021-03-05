const { Text } = require('@keystonejs/fields')
const { makeInitialValue, slugify } = require('./util')

// Using the text implementation because we're going to stringify the array of results.
// We could store this in another table, but this would require writing a complex controller.
// JSON.stringify feels good enough for this simple field.

const normalizeOptions = (options) => {
  if (typeof options === 'string') {
    return options.split(',').map((option) => ({
      value: slugify(option.trim()),
      label: option.trim(),
    }))
  }
  if (Array.isArray(options)) {
    return options.map((option, index) => {
      if (typeof option === 'object' && 'value' in option && 'label' in option) return option
      return {
        value: index,
        label: `${option}`,
      }
    })
  }
  return [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ]
}

class MultiCheckbox extends Text.implementation {
  constructor(path, { options, exclusive, reaction }) {
    super(...arguments)
    this.options = normalizeOptions(options)
    this.exclusive = typeof exclusive === 'undefined' ? true : exclusive // exclusive default to true
    this.reaction = reaction
    this.isOrderable = false
  }

  extendAdminMeta(meta) {
    // Remove additions to extendMeta by the text implementation
    // Add options to adminMeta
    // disable sorting as we don't know how this should be sorted

    return { ...meta, options: this.options, exclusive: this.exclusive, reaction: this.reaction, isOrderable: false }
  }

  gqlQueryInputFields() {
    return [
      `${this.path}: String`,
      // Create a graphQL query for each individual option
      ...this.options.map((option, index) => `${this.path}_${index + 1}: String`),
    ]
  }

  getDefaultValue({ context, originalInput }) {
    let result
    if (typeof this.defaultValue !== 'undefined') {
      if (typeof this.defaultValue === 'function') {
        result = this.defaultValue({ context, originalInput })
      } else {
        result = this.defaultValue
      }
    }
    return JSON.stringify(makeInitialValue(result, this.options))
  }
}

module.exports = {
  Implementation: MultiCheckbox,
  MongoIntegerInterface: Text.adapters.mongoose,
  KnexIntegerInterface: Text.adapters.knex,
}
