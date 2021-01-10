/** @jsx jsx */

import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldInput } from "@arch-ui/fields";
import { Input } from "@arch-ui/input";
import decamelize from "decamelize";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const SubField = ({ htmlId, label, value, onChange }) => {
  const inputValue = value || "";
  const displayLabel = capitalize(decamelize(label, " "));
  return (
    <div css={{ display: "flex", alignItems: "center" }}>
      <FieldContainer css={{ marginBottom: 12 }}>
        <FieldLabel field={{ label: displayLabel, config: { isRequired: false } }} css={{ fontSize: "80%", paddingBottom: "4px" }} />
        <FieldInput>
          <Input autoFocus={false} value={inputValue} onChange={(event) => onChange({ [label]: event.target.value })} id={htmlId} />
        </FieldInput>
      </FieldContainer>
    </div>
  );
};
