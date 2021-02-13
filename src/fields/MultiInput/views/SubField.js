/** @jsx jsx */

import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldInput } from "@arch-ui/fields";
import { Input } from "@arch-ui/input";
import decamelize from "decamelize";
import { capitalize } from "../util";

export const SubField = ({ htmlId, label, value, onChange }) => {
  const inputValue = value || "";
  const displayLabel = capitalize(decamelize(label, " "));
  return (
    <div css={{ marginBottom: 12 }}>
      <FieldLabel field={{ label: displayLabel, config: { isRequired: false } }} css={{ fontSize: "80%", paddingBottom: "4px" }} />
      <FieldInput>
        <Input autoFocus={false} value={inputValue} onChange={(event) => onChange({ [label]: event.target.value })} id={htmlId} />
      </FieldInput>
    </div>
  );
};
