/** @jsx jsx */

import React, { useEffect, useState, useRef } from "react";
import { jsx } from "@emotion/core";
import { FieldContainer, FieldLabel, FieldDescription } from "@arch-ui/fields";
import { FlexGroup } from "@arch-ui/layout";
import { IconButton } from "@arch-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";

const Spacer = ({ field, errors }) => {
  return (
    <FieldContainer
      data-field-type="spacer"
      css={{
        backgroundColor: "#FAFBFC",
        height: 42,
        overflow: "hidden",
        marginLeft: -26,
        marginRight: -26,
        marginBottom: 0,
      }}
    >
      <div
        css={{
          backgroundColor: "#FFF",
          height: 20,
          marginTop: -10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 16,
          borderRadius: 6,
          boxShadow: "0px 2px 5px 0px rgba(9,30,66,0.12)",
        }}
      ></div>
      <div
        css={{
          backgroundColor: "#FFF",
          height: 20,
          marginTop: 0,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -10,
          borderRadius: 6,
          boxShadow: "0px 2px 5px 0px rgba(9,30,66,0.12)",
        }}
      ></div>
    </FieldContainer>
  );
};
export default Spacer;
