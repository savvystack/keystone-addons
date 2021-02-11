/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, { useState, useEffect } from "react";
import { FieldContainer, FieldDescription } from "@arch-ui/fields";
import { FlexGroup } from "@arch-ui/layout";
import { SubField } from "./SubField";
import { ShieldIcon, PlusCircleIcon, NoEntryIcon } from "@primer/octicons-react";
import { Lozenge } from "@arch-ui/lozenge";
import { colors, gridSize } from "@arch-ui/theme";
import { slugify } from "../util";

const MultiCheckboxField = ({ onChange, autoFocus, field, value, errors }) => {
  let initialState, defaultValue;
  initialState = value ? value : field.config.defaultValue;
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const handleChange = (newValue) => {
    setValues({ ...values, ...newValue });
  };

  const accessError = (errors || []).find((error) => error instanceof Error && error.name === "AccessDeniedError");
  const uniqueKey = (field, label) => slugify(`ks-multicheckbox-${field.label}-${label}`);

  return (
    <FieldContainer>
      <div
        css={{
          color: colors.N60,
          fontSize: "0.9rem",
          fontWeight: 500,
          paddingBottom: gridSize,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {field.label}
      </div>
      {accessError ? <ShieldIcon title={accessError.message} css={{ color: colors.N20, marginRight: "1em" }} /> : null}
      {field.isRequired ? <Lozenge appearance="primary"> Required </Lozenge> : null}
      <FieldDescription text={field.adminDoc} />
      <FlexGroup>
        {field.config.options.map((label) => (
          <SubField key={uniqueKey(field, label)} htmlId={uniqueKey(field, label)} autoFocus={autoFocus} value={values[label]} label={label} onChange={handleChange} />
        ))}
      </FlexGroup>
    </FieldContainer>
  );
};

export default MultiCheckboxField;
