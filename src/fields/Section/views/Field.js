/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldDescription } from "@arch-ui/fields";
import { FlexGroup } from "@arch-ui/layout";
import { IconButton } from "@arch-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";

const SectionHeader = ({ field, value, errors, onChange }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {};

  return (
    <FieldContainer>
      <FlexGroup>
        <div css={{ height: "100%", display: "inline-flex" }}>
          <IconButton variant="subtle" appearance="default" spacing="cramped" icon={ChevronDownIcon} css={{ fontSize: "80%" }} onClick={toggleCollapse}></IconButton>
        </div>
        <div>
          <FieldLabel
            field={field}
            errors={errors}
            css={{
              lineHeight: 1.5,
              fontWeight: 700,
              padding: 0,
            }}
          />
          <FieldDescription text={field.adminDoc} css={{ marginBottom: 0 }} />
        </div>
      </FlexGroup>
      <hr
        style={{
          borderBottom: "none",
          borderColor: "rgba(193,199,208,0.5)",
        }}
      ></hr>
    </FieldContainer>
  );
};
export default SectionHeader;
