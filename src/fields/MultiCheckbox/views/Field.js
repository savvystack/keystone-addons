/** @jsx jsx */

import { jsx } from '@emotion/core'
import { css, keyframes } from '@emotion/react'
import React, { useState, useEffect, useRef } from 'react'
import { FieldContainer, FieldDescription } from '@arch-ui/fields'
import { FlexGroup } from '@arch-ui/layout'
import { SubField } from './SubField'
import { ShieldIcon } from '@primer/octicons-react'
import { Lozenge } from '@arch-ui/lozenge'
import { colors, gridSize } from '@arch-ui/theme'

const handleReaction = (ref, fadeAnim, options, reactions, selectedSet) => {
  const formElement = ref.current.closest('form')

  const findInputByFieldName = (fieldName) => formElement.querySelector(`[id*="-${fieldName}"]`) // match element with ID that contains '-fieldName'
  const findFieldByName = (fieldName) => {
    const inputElement = findInputByFieldName(fieldName)
    if (inputElement) return inputElement.closest(`[data-selector="field-container"]`)
  }

  const hideField = (fieldName) => {
    const fields = fieldName.split(',').map((n) => n.trim())
    fields.forEach((field) => {
      if (field === '') return
      const f = findFieldByName(field)
      if (f) {
        f.setAttribute('data-hidden-by-logic', 'true')
        f.style.display = 'none'
      }
    })
  }

  const showField = (fieldName) => {
    const fields = fieldName.split(',').map((n) => n.trim())
    fields.forEach((field) => {
      if (field === '') return
      const f = findFieldByName(field)
      if (f && f.style.display === 'none') {
        f.removeAttribute('data-hidden-by-logic')
        if (!f.getAttribute('data-hidden-by-section')) {
          f.style.display = 'block'
          f.style.animation = `${fadeAnim.next.name} 1s ease`
          // react generate a random name for animation, we want to use it directly
        }
      }
    })
  }

  const clearField = (fieldName) => {
    const fields = fieldName.split(',').map((n) => n.trim())
    fields.forEach((field) => {
      if (field === '') return
      const inputElement = findInputByFieldName(field)
      inputElement.value = ''
    })
  }

  const setFieldValue = (fieldName, value) => {
    const fields = fieldName.split(',').map((n) => n.trim())
    fields.forEach((field) => {
      if (field === '') return
      const inputElement = findInputByFieldName(field)
      inputElement.value = value
    })
  }

  if (!reactions) return

  options.forEach(({ value }) => {
    const actionScript = reactions[selectedSet.has(value) ? `${value}_selected` : `${value}_unselected`]
    if (actionScript) {
      new Function('hide, show, clear, set', `${actionScript}`)(hideField, showField, clearField, setFieldValue)
    }
  })
}

const MultiCheckboxField = ({ onChange, field, value, errors }) => {
  const fadingHighlight = keyframes`
    0% {
      background-color: rgba(255, 255, 0, 0.3);
    }
    50% {
      background-color: rgba(255, 255, 0, 0.3);
    }
    100% {
      background-color: rgba(255, 255, 0, 0);
    }
  `

  // this is the animation for showing hidden fields, used by reaction scripts
  // in order to access the randomly generated CSS class name, we add it to the DOM thru JSX
  const fadeAnim = css`
    animation: ${fadingHighlight} 1s ease;
  `

  const ref = useRef(null)
  const accessError = (errors || []).find((error) => error instanceof Error && error.name === 'AccessDeniedError')
  const uniqueKey = (field, label) => `ks-multicheckbox-${field.path}-${label}`

  // `selected` is a simple value in exclusive mode, an array of values (could be empty) in non-exclusive mode
  let selectedSet = field.config.exclusive ? new Set([value.selected]) : new Set(value.selected)

  const handleChange = (index, checked) => {
    console.log(`${index}, ${checked}`)
    if (checked) {
      if (field.config.exclusive) selectedSet.clear()
      selectedSet.add(field.config.options[index].value)
    } else {
      selectedSet.delete(field.config.options[index].value)
    }

    if (field.config.exclusive) {
      onChange({
        ...value,
        selected: selectedSet.size > 0 ? Array.from(selectedSet)[0] : null,
      })
    } else {
      onChange({
        ...value,
        selected: Array.from(selectedSet),
      })
    }
    handleReaction(ref, fadeAnim, field.config.options, field.config.reaction, selectedSet)
  }

  return (
    <FieldContainer>
      <div
        ref={ref}
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
      {accessError && <ShieldIcon title={accessError.message} css={{ color: colors.N20, marginRight: '1em' }} />}
      {field.isRequired ? <Lozenge appearance="primary"> Required </Lozenge> : null}
      <FieldDescription text={field.adminDoc} />
      <FlexGroup>
        {field.config.options.map((option, index) => (
          <SubField key={uniqueKey(field, index)} htmlId={uniqueKey(field, index)} index={index} checked={selectedSet.has(option.value)} label={option.label} onChange={handleChange} css={fadeAnim} />
          // the reference to `fadeAnim` is dummy, it has no effect on SubField
        ))}
      </FlexGroup>
    </FieldContainer>
  )
}

export default MultiCheckboxField
