# Keystone Addons

## MultiInput custom field

![Image of Yaktocat](docs/multiinput-screenshot.png)

Allow one Keystone field to hold multiple values. The underlying field is a Text field. 

The values are stringified into a JSON before saving, and deserialized before displaying.

If `defaultValue` is provided, it must have the same number of elements as `options`.



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

## Installation

```
cd <your project>
git submodule add https://github.com/savvystack/keystone-addons
```

Note: I had some trouble building an NPM package out of this project. Keystone's unique approach of mixing
 client-side code with server-side code makes the bundler's job complicated. I have yet to dive deep
enough into Keystone's bundler logic (`field-views-loader.js`) to figure out why.


## Credit
Based on the `MultiCheck` custom field sample in [KeystoneJS](https://www.keystonejs.com).