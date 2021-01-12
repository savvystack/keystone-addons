# Spacer field

A spacer to break the form into segments **visually**. Use it in conjection with 
the [`Section`](./section.md) field.

![spacer](./spacer-screenshot.png)

Like `Section`, `Spacer` is based on the built-in `Virtual` field type. They won't show up in the database schema. However, you'll find them in the GraphQL schema, which you can safely ignore.

## Props

None.

## Example

```javascript
const { Spacer, Section } = require("./keystone-addons/src/fields");

keystone.createList("Sample", {
  fields: {
    customerId: { type: Text, isRequired: true },
    spacer1: { type: Spacer },
    section1: {
      type: Section,
      collapsible: true,
      label: "Demographic Information",
      adminDoc: "Some useful information about the client",
    },
    name: { type: Text },
    address: { type: Text },
    spacer2: { type: Spacer },
    section2: {
      type: Section,
      collapsible: true,
      label: "Financial Information",
      adminDoc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    checkingAccount: { type: Text, isRequired: true },
    savingAccount: { type: Text },
    creditCard: { type: Text },
    ...
  }
});

```

## Known issues

None.