/** @jsx jsx */
import { jsx } from "@emotion/core";
import decamelize from "decamelize";
import { capitalize, slugify } from "../util";

const uniqueKey = (field, index) => slugify(`ks-multicheckbox-cell-${field.label}-${index}`);

export default function MultiCheckboxCell({ data, field }) {
  if (data === null) {
    data = field.getDefaultValue();
  }
  return Object.keys(data).map((label, i) => {
    const displayLabel = capitalize(decamelize(label, " "));
    if (data[label] === true) {
      return (
        <p
          key={uniqueKey(field, i)}
          css={{
            marginBlockStart: "0.2em",
            marginBlockEnd: "0.2em",
          }}
        >
          {displayLabel}
        </p>
      );
    } else {
      return "";
    }
  });
}
