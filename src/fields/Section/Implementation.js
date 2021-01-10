const { Virtual } = require("@keystonejs/fields");

class SectionImpl extends Virtual.implementation {
  constructor(path) {
    super(...arguments);
    this.isOrderable = false;
    this.resolver = () => {
      return undefined;
    };
  }
}

module.exports = {
  SectionImpl,
};
