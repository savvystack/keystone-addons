# MultiInput field

![multiinput](./multiinput-screenshot.png)

Allow one Keystone field to hold multiple values. The underlying field is a Text field. 

The values are stringified into a JSON before saving, and deserialized before displaying.

If `defaultValue` is provided, it must have the same number of elements as `options`.


## Props

| Name | Type | Required | Description |
| --- | --- |
| `options`       | Array of strings | Yes | Each option will create a subfield. The option string will be *decamelized* and used as the field label. It's also used as the key in the serialized JSON data. |
| `defaultValue`  | Array of primitives | No | Provide default values to each subfield. |


## Example

```javascript
const MultiInput = require("./keystone-addons/src/fields/MultiInput");

keystone.createList("Sample", {
  fields: {
    ...
    singleNoDefault: { type: MultiInput, options: ["name", "age", "sex", "birthDate"] },
    singleWithDefault: { type: MultiInput, options: ["name", "age", "sex", "birthDate"], defaultValue: ["default", 18, "M", "1/1/2011"] },
    multiNoDefault: { type: MultiInput, options: ["name", "age", "sex", "birthDate"], multi: true },
    multiWithDefault: { type: MultiInput, options: ["name", "age", "sex", "birthDate"], multi: true, defaultValue: ["default", 18, "M", "1/1/2011"] },
    ...
  }
});

```

## Known issues

1. "Reset Changes" is not working at the moment.
