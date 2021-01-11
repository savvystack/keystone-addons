/** @jsx jsx */

import React, { useEffect, useState, useRef } from "react";
import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldDescription } from "@arch-ui/fields";
import { FlexGroup } from "@arch-ui/layout";
import { IconButton } from "@arch-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";

const SectionHeader = ({ field, errors }) => {
  const ref = useRef(null);
  const [isCollapsed, setCollapsed] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && field.config.collapsible) {
      setTimeout(() => toggleCollapse(), 100);
      setInitialized(true);
    }
  });

  const toggleCollapse = () => {
    const thisContainer = ref.current.parentElement;
    const fields = thisContainer.parentElement.querySelectorAll("div[data-selector='field-container']");
    const fieldsInSection = [];
    let inSection = false;
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      if (f === thisContainer) inSection = true;
      else if (f.getAttribute("data-field-type") === "section") {
        if (inSection) break;
      } else {
        if (inSection) fieldsInSection.push(f);
      }
    }
    fieldsInSection.forEach((f) => {
      f.style.display = isCollapsed ? "block" : "none";
    });
    setCollapsed(!isCollapsed);
  };

  return (
    <FieldContainer data-field-type="section">
      <FlexGroup growIndexes={[0]}>
        <div>
          <FieldLabel
            field={field}
            errors={errors}
            css={{
              lineHeight: 1.5,
              fontWeight: 700,
              padding: 0,
              cursor: field.config.collapsible ? "pointer" : "default",
            }}
            onClick={field.config.collapsible ? toggleCollapse : undefined}
          />
          <FieldDescription text={field.adminDoc} css={{ marginBottom: 0 }} />
        </div>
        <div css={{ height: "100%", display: "inline-flex" }}>
          <IconButton
            variant="subtle"
            appearance="default"
            spacing="cramped"
            isDisabled={!field.config.collapsible}
            icon={isCollapsed ? ChevronUpIcon : ChevronDownIcon}
            css={{ fontSize: "80%" }}
            onClick={toggleCollapse}
          ></IconButton>
        </div>
      </FlexGroup>
      <hr
        ref={ref}
        css={{
          borderBottom: "none",
          borderColor: "rgba(193,199,208,0.5)",
        }}
      ></hr>
    </FieldContainer>
  );
};
export default SectionHeader;
