/** @jsx jsx */

import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldInput } from "@arch-ui/fields";
import { CheckboxPrimitive } from "@arch-ui/controls";
import decamelize from "decamelize";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const SubField = ({ htmlId, label, value, onChange }) => {
  const inputValue = value || "";
  const displayLabel = capitalize(decamelize(label, " "));
  return (
    <div css={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: "0.5rem" }}>
      <CheckboxPrimitive autoFocus={false} checked={!!value} onChange={(event) => onChange({ [label]: event.target.value })} id={htmlId} />
      <FieldLabel field={{ label: displayLabel, config: { isRequired: false } }} css={{ paddingBottom: "2px" }} />
    </div>
  );
};
