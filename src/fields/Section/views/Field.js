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

  useEffect(() => {
    if (field.config.collapsible) {
      toggleCollapse();
    }
  }, []);

  const toggleCollapse = () => {
    const thisContainer = ref.current.closest("div[data-field-type='section']");
    const fields = thisContainer.parentElement.querySelectorAll("div[data-selector='field-container']");
    const fieldsInSection = [];
    let inSection = false;
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      const fieldType = "" + f.getAttribute("data-field-type");
      if (f === thisContainer) {
        inSection = true;
      } else if (fieldType === "section" || fieldType === "spacer") {
        if (inSection) break;
      } else {
        if (inSection) fieldsInSection.push(f);
      }
    }
    fieldsInSection.forEach((f) => {
      if (isCollapsed) {
        // reveal if the field is not hidden for other reasons
        if (!f.getAttribute("data-hidden-by-logic")) f.style.display = "block";
        f.removeAttribute("data-hidden-by-section");
      } else {
        f.style.display = "none";
        f.setAttribute("data-hidden-by-section", true);
      }
    });
    setCollapsed(!isCollapsed);
  };

  return (
    <FieldContainer data-field-type="section" css={{ marginBottom: 10 }}>
      <FlexGroup growIndexes={[0]}>
        <div ref={ref}>
          <FieldLabel
            field={field}
            errors={errors}
            css={{
              lineHeight: 1.5,
              fontSize: "100%",
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
    </FieldContainer>
  );
};
export default SectionHeader;
