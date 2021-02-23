const { Text } = require("@keystonejs/fields");
const { parseDefaultValues, constructSubfields } = require("./util");

// Using the text implementation because we're going to stringify the array of results.
// We could store this in another table, but this would require writing a complex controller.
// JSON.stringify feels good enough for this simple field.

class MultiInput extends Text.implementation {
  constructor(path, { options, repeatable, subfields }) {
    super(...arguments);

    if (!subfields && options) subfields = constructSubfields(options);

    if (!subfields) {
      throw new Error(
        `
  🚫 The MultiInput field ${this.listKey}.${path} requires either "options" or "subfields", check your field definition;
  `
      );
    }
    this.subfields = subfields;
    this.repeatable = repeatable;
    this.isOrderable = false;
  }

  extendAdminMeta(meta) {
    // Remove additions to extendMeta by the text implementation
    // Add options to adminMeta
    // disable sorting as we don't know how this should be sorted

    return { ...meta, subfields: this.subfields, repeatable: this.repeatable, isOrderable: false };
  }

  gqlQueryInputFields() {
    return [
      `${this.path}: String`,
      // Create a graphQL query for each individual option
      ...Object.keys(this.subfields).map((subfield) => `${this.path}_${subfield}: String`),
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
    return JSON.stringify(parseDefaultValues(result, this.subfields));
  }
}

module.exports = {
  Implementation: MultiInput,
  MongoIntegerInterface: Text.adapters.mongoose,
  KnexIntegerInterface: Text.adapters.knex,
};
