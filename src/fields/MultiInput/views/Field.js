/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, { useState, useEffect } from "react";
import { FieldContainer, FieldDescription } from "@arch-ui/fields";
import { FlexGroup } from "@arch-ui/layout";
import { SubField } from "./SubField";
import { ShieldIcon, PlusCircleIcon, NoEntryIcon } from "@primer/octicons-react";
import { Lozenge } from "@arch-ui/lozenge";
import { colors, gridSize } from "@arch-ui/theme";
import { IconButton } from "@arch-ui/button";
import { slugify } from "../util";

const MultiInputField = ({ onChange, autoFocus, field, value, errors }) => {
  let initialState, defaultValue;
  if (field.config.multi) {
    defaultValue = field.getDefaultValue();
    if (value && Array.isArray(value)) initialState = value;
    else initialState = [];
    // under multi mode, values is an array of subitems, each is in turn an array of values
  } else {
    initialState = value ? value : field.config.defaultValue;
    // this comes from the Keystone sample code, but it doesn't work as supposed.
    // field.config.defaultValue is undefined, and value is already set to the defaultValue
  }
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const handleChange = (newValue) => {
    setValues({ ...values, ...newValue });
  };

  const handleSubItemChange = (index) => (newValue) => {
    setValues([...values.slice(0, index), { ...values[index], ...newValue }, ...values.slice(index + 1)]);
  };

  const handleAddSubItem = () => {
    setValues([...values, defaultValue]);
  };

  const handleRemoveSubItem = (index) => () => {
    setValues([...values.slice(0, index), ...values.slice(index + 1)]);
  };

  const accessError = (errors || []).find((error) => error instanceof Error && error.name === "AccessDeniedError");
  const uniqueKey = (field, index, label = "") => slugify(`ks-multiinput-${field.label}-${index}-${label}`);

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
      {field.config.multi ? (
        <>
          {values.map((subitem, index) => (
            <FlexGroup key={uniqueKey(field, index)}>
              <div css={{ height: "100%", display: "inline-flex" }}>
                <IconButton variant="subtle" appearance="default" spacing="cramped" icon={NoEntryIcon} onClick={handleRemoveSubItem(index)}></IconButton>
              </div>
              {field.config.options.map((sublabel) => (
                <SubField
                  key={uniqueKey(field, index, sublabel)}
                  htmlId={uniqueKey(field, index, sublabel)}
                  autoFocus={autoFocus}
                  value={subitem[sublabel]}
                  label={sublabel}
                  onChange={handleSubItemChange(index)}
                />
              ))}
            </FlexGroup>
          ))}
          <div css={{ height: "100%", display: "inline-flex" }}>
            <IconButton variant="subtle" appearance="default" spacing="cramped" icon={PlusCircleIcon} css={{ fontSize: "80%" }} onClick={handleAddSubItem}></IconButton>
          </div>
        </>
      ) : (
        <FlexGroup>
          {field.config.options.map((label) => (
            <SubField key={uniqueKey(field, 0, label)} htmlId={uniqueKey(field, 0, label)} autoFocus={autoFocus} value={values[label]} label={label} onChange={handleChange} />
          ))}
        </FlexGroup>
      )}
    </FieldContainer>
  );
};

export default MultiInputField;
