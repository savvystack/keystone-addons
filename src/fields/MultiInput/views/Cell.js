/** @jsx jsx */
import { jsx } from "@emotion/core";
import decamelize from "decamelize";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function MultiInputCell({ data, field }) {
  if (data === null) {
    data = field.getDefaultValue();
  }
  if (Array.isArray(data)) {
    return data.map((subitem, index) => {
      const values = [];
      Object.entries(subitem).forEach(([label, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          const displayLabel = capitalize(decamelize(label, " "));
          values.push(`${displayLabel}: ${value}`);
        }
      });
      return (
        <p
          key={`ks-multiinput-cell-${field.label}-${index}`}
          css={{
            marginBlockStart: "0.2em",
            marginBlockEnd: "0.2em",
          }}
        >
          {values.join(", ")}
        </p>
      );
    });
  } else {
    return Object.keys(data).map((label, i) => {
      const displayLabel = capitalize(decamelize(label, " "));
      return (
        <p
          key={`ks-multiinput-cell-${field.label}-${i}`}
          css={{
            marginBlockStart: "0.2em",
            marginBlockEnd: "0.2em",
          }}
        >
          {displayLabel}: {data[label]}
        </p>
      );
    });
  }
}
