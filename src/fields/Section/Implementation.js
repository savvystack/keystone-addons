const { Virtual } = require("@keystonejs/fields");

class SectionImpl extends Virtual.implementation {
  constructor(path, { collapsible }) {
    super(...arguments);
    this.isOrderable = false;
    this.collapsible = !!collapsible;
    this.resolver = () => {
      return undefined;
    };
  }

  extendAdminMeta(meta) {
    return { ...super.extendAdminMeta(...arguments), collapsible: this.collapsible };
  }
}

module.exports = {
  SectionImpl,
};
