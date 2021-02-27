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
import { slugify } from '../util'

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

  const fadeAnim = css`
    animation: ${fadingHighlight} 1s ease;
  `

  const ref = useRef(null)

  const handleReaction = (actions, values) => {
    const formElement = ref.current.closest('form')

    const findInputByFieldName = (fieldName) => formElement.querySelector(`[id*="-${fieldName}"]`) // match element with ID that contains '-fieldName'
    const findFieldByName = (fieldName) => {
      const inputElement = findInputByFieldName(fieldName)
      if (inputElement) return inputElement.closest(`[data-selector="field-container"]`)
    }

    const hideField = (fieldName) => {
      const f = findFieldByName(fieldName)
      if (f) {
        f.setAttribute('data-hidden-by-logic', 'true')
        f.style.display = 'none'
      }
    }

    const showField = (fieldName) => {
      const f = findFieldByName(fieldName)
      if (f && f.style.display === 'none') {
        f.removeAttribute('data-hidden-by-logic')
        if (!f.getAttribute('data-hidden-by-section')) {
          f.style.display = 'block'
          f.style.animation = `${fadeAnim.next.name} 1s ease`
          // react generate a random name for animation, we want to use it directly
        }
      }
    }

    const clearField = (fieldName) => {
      const inputElement = findInputByFieldName(fieldName)
      inputElement.value = ''
    }

    const setFieldValue = (fieldName, value) => {
      const inputElement = findInputByFieldName(fieldName)
      inputElement.value = value
    }

    if (!actions) return

    Object.entries(values).forEach(([key, value]) => {
      const actionKey = `${key}_${value}`
      const script = actions[actionKey]
      if (script) {
        new Function('hide, show, clear, set', `${script}`)(hideField, showField, clearField, setFieldValue)
      }
    })
  }

  const handleChange = (newValue) => {
    const copyOfValue = { ...value }
    if (!field.config.multi) {
      // only one True value is allowed
      // newValue is an object like { [label]: boolean }
      // if the newValue is true, set all other values to false
      if (Object.values(newValue).length > 0 && Object.values(newValue)[0]) {
        Object.keys(copyOfValue).forEach((key) => (copyOfValue[key] = false))
      }
    }
    value = { ...copyOfValue, ...newValue }
    onChange(value)
    handleReaction(field.config.reaction, value)
  }

  const accessError = (errors || []).find((error) => error instanceof Error && error.name === 'AccessDeniedError')
  const uniqueKey = (field, label) => slugify(`ks-multicheckbox-${field.label}-${label}`)

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
          <SubField key={uniqueKey(field, index)} htmlId={uniqueKey(field, index)} index={index} value={value[index]} label={option} onChange={handleChange} css={fadeAnim} />
          // the reference to `fadeAnim` is dummy, it has no effect on SubField
        ))}
      </FlexGroup>
    </FieldContainer>
  )
}

export default MultiCheckboxField
