const { SectionImpl } = require("./Implementation");

const { Virtual } = require("@keystonejs/fields");

module.exports = {
  type: "Section",
  implementation: SectionImpl,
  views: {
    Controller: Virtual.views.Controller,
    Field: require.resolve("./views/Field"),
    Filter: Virtual.views.Filter,
    Cell: require.resolve("./views/Cell"),
  },
  adapters: Virtual.adapters,
};
