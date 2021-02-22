/** @jsx jsx */

import { jsx } from "@emotion/core";
import { FieldLabel, FieldInput } from "@arch-ui/fields";
import { Input } from "@arch-ui/input";

export const SubField = ({ htmlId, path, label, value, onChange }) => {
  const inputValue = value || "";
  return (
    <div css={{ marginBottom: 12 }}>
      <FieldLabel field={{ label, config: { isRequired: false } }} css={{ fontSize: "80%", paddingBottom: "4px", whiteSpace: "nowrap" }} />
      <FieldInput>
        <Input autoFocus={false} value={inputValue} onChange={(event) => onChange({ [path]: event.target.value })} id={htmlId} />
      </FieldInput>
    </div>
  );
};
