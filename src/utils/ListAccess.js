const CreateOnly = {
  access: {
    read: true,
    create: true,
    update: false,
  },
};

const ReadOnly = {
  access: {
    read: true,
    create: false,
    update: false,
  },
};

const UpdateOnly = {
  access: {
    read: true,
    create: false,
    update: true,
  },
};

const useAccess = (listDef, directives) => {
  const applyAccessPolicyToField = (fieldName, policy) => {
    if (fieldName in listDef.fields) {
      if (listDef.fields[fieldName].access) {
        throw new Error(`🚫 Field "${fieldName}" already has an access directive`);
      }
      listDef.fields[fieldName].access = policy.access;
    }
  };

  const applyAccessPolicy = (directive, policy) => {
    if (typeof directive === "string") {
      // the directive identify a field name
      applyAccessPolicyToField(directive, policy);
    } else if (Array.isArray(directive)) {
      // ["fieldA", "fieldB"]
      directive.forEach((fieldName) => applyAccessPolicyToField(fieldName, policy));
    } else if (typeof directive === "object") {
      let fieldsToExclude = [];

      if (Array.isArray(directive.except)) fieldsToExclude = directive.except;
      // { except: ["fieldA", "fieldB"]}
      else if (typeof directive.except === "string") fieldsToExclude = [directive.except];
      // { except: "fieldA" }

      Object.keys(listDef.fields).forEach((fieldName) => {
        if (!fieldsToExclude.includes(fieldName)) applyAccessPolicyToField(fieldName, policy);
      });
    }
  };

  const checkRequiredFields = () => {
    Object.entries(listDef.fields).forEach(([fieldName, field]) => {
      if (field.isRequired && field.access && !field.access.create) {
        throw new Error(`🚫 Field "${fieldName}" is required but not creatable. Consider removing "isRequired: true".`);
      }
    });
  };

  applyAccessPolicy(directives.createOnly, CreateOnly);
  applyAccessPolicy(directives.readOnly, ReadOnly);
  applyAccessPolicy(directives.updateOnly, UpdateOnly);

  checkRequiredFields();

  return listDef;
};

module.exports = {
  CreateOnly,
  ReadOnly,
  UpdateOnly,
  useAccess,
};
