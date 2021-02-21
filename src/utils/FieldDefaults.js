// apply a defaultRule function on each field, use the return value as the default for the field definition
// also apply an overrideRule function each field, use the return value to override the values in the field definition
const useDefaults = (listDef, defaultFunc, overrideFunc) => {
  const resultFields = {};
  Object.entries(listDef.fields).forEach(([path, field]) => {
    const defaultValues = defaultFunc ? defaultFunc({ path, field }) : {};
    const interimFieldValues = { ...defaultValues, ...field };
    const overrideValues = overrideFunc ? overrideFunc({ path, field: interimFieldValues }) : {};
    resultFields[path] = { ...interimFieldValues, ...overrideValues };
  });

  return { ...listDef, fields: resultFields };
};

module.exports = {
  useDefaults,
};
