/** @jsx jsx */

import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldInput } from "@arch-ui/fields";
import { CheckboxPrimitive } from "@arch-ui/controls";
import decamelize from "decamelize";
import { capitalize } from "../util";

export const SubField = ({ htmlId, label, value, onChange }) => {
  const checked = value || false;
  const displayLabel = capitalize(decamelize(label, " "));
  const handleChange = (event) => {
    onChange({ [label]: event.target.checked });
  };

  return (
    <div css={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: "0.5rem" }}>
      <CheckboxPrimitive autoFocus={false} checked={!!value} onChange={handleChange} id={htmlId} />
      <FieldLabel field={{ label: displayLabel, config: { isRequired: false } }} css={{ paddingBottom: "2px" }} />
    </div>
  );
};
