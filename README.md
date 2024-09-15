# react-style-stringify

A utility for converting React `CSSProperties` objects or `Record<string, CSSProperties>` into CSS strings.

This utility was originally created to simplify the process of adding inline CSS styles to HTML email templates in a React project. Previously, all styles were written as plain strings, which became unmanageable as the project grew. To make styles more maintainable and consistent, this utility was developed to convert React `CSSProperties` objects into CSS strings, streamlining the process of embedding styles in the final HTML before sending emails.

## Features

- Converts a single `CSSProperties` object to a CSS string.
- Converts a `Record<string, CSSProperties>` map to a CSS string.
- Automatically adds units (e.g., `px`) where necessary.
- Optionally injects the `!important` statement for each style property.

## Installation

To install the package, use:

```bash
npm install react-style-stringify
```

or

```bash
yarn add react-style-stringify
```

## Usage

Here’s a basic example of how to use the package:

```tsx
import {
  stringifyCSSProperties,
  stringifyStyleMap,
} from "react-style-stringify";

// Convert a single CSSProperties object
const cssString = stringifyCSSProperties({
  flex: 1,
  padding: 20,
  backgroundColor: "teal",
});
// Output: "flex:1; padding:20px; background-color:teal;"

// Convert a Record<string, CSSProperties> object
const cssMapString = stringifyStyleMap({
  div: {
    color: "blue",
    marginBottom: 20,
  },
  ".my-class": {
    padding: 10,
    fontSize: 14,
  },
});
// Output: "div{color:blue; margin-bottom:20px;} .my-class{padding:10px; font-size:14px;}"
```

## API

### Exported Types

#### `StyleMap: Record<string, CSSProperties>`

Defines a map where keys are CSS selectors (`string`) and values are `CSSProperties` objects, which represent inline CSS styles in React.

### Exported Functions

#### `stringifyCSSProperties(style: CSSProperties, important?: boolean): string`

Converts a single `CSSProperties` object to a CSS string. Automatically adds units (e.g., `px`) where required.

When set `important` argument to `true`, appends `!important` to each CSS property in the resulting string. Default is `false`.

#### `stringifyStyleMap(styles: StyleMap, important?: boolean): string`

Converts a `StyleMap` object to a string.

When set `important` argument to `true`, appends `!important` to each CSS property in the resulting string. Default is `false`.

## Dependencies

This package uses the following dependencies:

- **[@emotion/unitless](https://www.npmjs.com/package/@emotion/unitless)**: Handles checking for CSS properties that are unitless (e.g., `line-height`, `z-index`, etc.).

## Contributing

Contributions are welcome! If you have ideas or improvements, feel free to open an issue or submit a pull request.

### Steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

Please make sure your code adheres to the project's coding standards and passes the existing tests.
