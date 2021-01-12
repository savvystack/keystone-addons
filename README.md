# Keystone Addons

Some useful add-ons to the wonderful [KeystoneJS](https://www.keystonejs.com).

## Custom fields
* [MultiInput](./docs/multiinput.md): a composite field that allows multiple subitems and subfields.
* [Section](./docs/section.md): a collapsible section header that divide a long form into multiple sections.
* [Spacer](./docs/spacer.md): a visual break in the form panel.

## Installation

```
cd <your project>
git submodule add https://github.com/savvystack/keystone-addons
```

Note: I had some trouble building an NPM package out of this project. Keystone's unique approach of mixing
 client-side code with server-side code makes the bundler's job complicated. I have yet to dive deep
enough into Keystone's bundler logic (`field-views-loader.js`) to figure out why.

## License

MIT License

Copyright (c) 2021 Savvy Stack, Inc.
