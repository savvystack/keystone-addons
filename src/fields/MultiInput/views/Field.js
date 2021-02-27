/** @jsx jsx */

import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { FieldContainer, FieldDescription } from '@arch-ui/fields'
import { FlexGroup } from '@arch-ui/layout'
import { SubField } from './SubField'
import { ShieldIcon, PlusCircleIcon, NoEntryIcon } from '@primer/octicons-react'
import { Lozenge } from '@arch-ui/lozenge'
import { colors, gridSize } from '@arch-ui/theme'
import { IconButton } from '@arch-ui/button'
import { slugify } from '../util'

/* convert the single dimensional list of subfields into groups, each contains a subset of subfields. The output looks like this:
[
  {
    label: "a group label", // can be an empty string, but won't be null or undefined
    items: [ { path: "subfieldPath", label: "a subfield label"} ],
    growIndexes: [ 0 ], // the item with index appearing here will be allowed to grow when rendered on the page
  }
]
*/
const breakSubfields = (subfields) => {
  const groups = []
  let currentGroupLabel
  let currentGroupItems = []
  let currentGroupGrowIndexes = []
  Object.entries(subfields).forEach(([path, subfield]) => {
    const combinedSubfield = { path, ...subfield }
    if (subfield.groupLabel !== undefined) {
      // empty string is ok
      if (currentGroupItems.length > 0) {
        groups.push({ label: currentGroupLabel, items: currentGroupItems, growIndexes: currentGroupGrowIndexes })
      }
      currentGroupLabel = subfield.groupLabel
      currentGroupItems = [combinedSubfield]
      currentGroupGrowIndexes = subfield.grow ? [0] : []
    } else {
      if (subfield.grow) currentGroupGrowIndexes.push(currentGroupItems.length)
      currentGroupItems.push(combinedSubfield)
    }
  })

  groups.push({ label: currentGroupLabel, items: currentGroupItems, growIndexes: currentGroupGrowIndexes })
  return groups
}

const MultiInputField = ({ onChange, autoFocus, field, value, errors }) => {
  console.log(value)
  let fieldValue, defaultValue
  if (field.config.repeatable) {
    // for repeatable subfields, the defaultValue is appied to each subitem newly added
    defaultValue = field.getDefaultValue()
    console.log(`repeatable defaultValue: ${JSON.stringify(defaultValue)}`)
    if (value && Array.isArray(value)) fieldValue = value
    else fieldValue = []
    // under repeatable mode, values is an array of subitems, each is in turn an array of values
  } else {
    // for non-repeable subfields, `defaultValue` has already been merged into `value`
    fieldValue = value
  }

  const handleChange = (newValue) => {
    fieldValue = { ...fieldValue, ...newValue }
    onChange(fieldValue)
  }

  const handleSubItemChange = (index) => (newValue) => {
    fieldValue = [...fieldValue.slice(0, index), { ...fieldValue[index], ...newValue }, ...fieldValue.slice(index + 1)]
    onChange(fieldValue)
  }

  const handleAddSubItem = () => {
    fieldValue = [...fieldValue, defaultValue]
    onChange(fieldValue)
  }

  const handleRemoveSubItem = (index) => () => {
    fieldValue = [...fieldValue.slice(0, index), ...fieldValue.slice(index + 1)]
    onChange(fieldValue)
  }

  const accessError = (errors || []).find((error) => error instanceof Error && error.name === 'AccessDeniedError')
  const uniqueKey = (field, index, label = '') => slugify(`ks-multiinput-${field.path}-${index}-${label}`)

  const subfieldGroups = breakSubfields(field.config.subfields)

  return (
    <FieldContainer>
      <div
        css={{
          color: colors.N60,
          fontSize: '0.9rem',
          fontWeight: 500,
          paddingBottom: gridSize,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {field.label}
      </div>
      {accessError ? <ShieldIcon title={accessError.message} css={{ color: colors.N20, marginRight: '1em' }} /> : null}
      {field.isRequired ? <Lozenge appearance="primary"> Required </Lozenge> : null}
      <FieldDescription text={field.adminDoc} />
      {field.config.repeatable ? (
        <>
          {fieldValue.map((subitem, subItemIndex) => (
            <FlexGroup key={uniqueKey(field, subItemIndex)}>
              <div>
                <IconButton variant="subtle" appearance="default" spacing="cramped" icon={NoEntryIcon} onClick={handleRemoveSubItem(subItemIndex)}></IconButton>
              </div>
              <div>
                {subfieldGroups.map((group, groupIndex) => (
                  <div key={uniqueKey(field, subItemIndex, groupIndex)}>
                    {group.label && <div css={{ color: colors.N60, fontSize: '0.9rem', fontWeight: 500, paddingBottom: gridSize }}>{group.label}</div>}
                    <FlexGroup growIndexes={group.growIndexes}>
                      {group.items.map(({ path, label }) => (
                        <SubField
                          key={uniqueKey(field, subItemIndex, label)}
                          htmlId={uniqueKey(field, subItemIndex, label)}
                          path={path}
                          value={subitem[path]}
                          label={label}
                          onChange={handleSubItemChange(subItemIndex)}
                        />
                      ))}
                    </FlexGroup>
                  </div>
                ))}
              </div>
            </FlexGroup>
          ))}
          <div css={{ height: '100%', display: 'inline-flex' }}>
            <IconButton variant="subtle" appearance="default" spacing="cramped" icon={PlusCircleIcon} css={{ fontSize: '80%' }} onClick={handleAddSubItem}>
              Add Item
            </IconButton>
          </div>
        </>
      ) : (
        <>
          {subfieldGroups.map((group, groupIndex) => (
            <div key={uniqueKey(field, 0, groupIndex)}>
              {group.label && <div css={{ color: colors.N60, fontSize: '0.9rem', fontWeight: 500, paddingBottom: gridSize }}>{group.label}</div>}
              <FlexGroup growIndexes={group.growIndexes}>
                {group.items.map(({ path, label }) => (
                  <SubField key={uniqueKey(field, 0, label)} htmlId={uniqueKey(field, 0, label)} path={path} value={fieldValue[path]} label={label} onChange={handleChange} />
                ))}
              </FlexGroup>
            </div>
          ))}
        </>
      )}
    </FieldContainer>
  )
}

export default MultiInputField
