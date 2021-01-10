const { Text } = require("@keystonejs/fields");
const { parseDefaultValues } = require("./util");

// Using the text implementation because we're going to stringify the array of results.
// We could store this in another table, but this would require writing a complex controller.
// JSON.stringify feels good enough for this simple field.

class MultiInput extends Text.implementation {
  constructor(path, { options, multi }) {
    super(...arguments);
    if (!Array.isArray(options)) {
      throw new Error(
        `
  🚫 The MultiInput field ${this.listKey}.${path} is not configured with valid options;
  `
      );
    }
    this.options = options;
    this.multi = multi;
    this.isOrderable = false;
  }

  extendAdminMeta(meta) {
    // Remove additions to extendMeta by the text implementation
    // Add options to adminMeta
    // disable sorting as we don't know how this should be sorted

    return { ...meta, options: this.options, multi: this.multi, isOrderable: false };
  }

  gqlQueryInputFields() {
    return [
      `${this.path}: String`,
      // Create a graphQL query for each individual option
      ...this.options.map((option) => `${this.path}_${option}: String`),
    ];
  }

  getDefaultValue({ context, originalInput }) {
    let result;
    if (typeof this.defaultValue !== "undefined") {
      if (typeof this.defaultValue === "function") {
        result = this.defaultValue({ context, originalInput });
      } else {
        result = this.defaultValue;
      }
    }
    return JSON.stringify(parseDefaultValues(result, this.options));
  }
}

module.exports = {
  Implementation: MultiInput,
  MongoIntegerInterface: Text.adapters.mongoose,
  KnexIntegerInterface: Text.adapters.knex,
};
