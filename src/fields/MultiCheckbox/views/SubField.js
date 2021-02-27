/** @jsx jsx */

import { jsx } from '@emotion/core'
import { FieldContainer, FieldLabel, FieldInput } from '@arch-ui/fields'
import { CheckboxPrimitive } from '@arch-ui/controls'

export const SubField = ({ htmlId, index, label, value, onChange }) => {
  const handleChange = (event) => {
    onChange({ [index]: event.target.checked })
  }

  return (
    <div css={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '0.5rem' }}>
      <CheckboxPrimitive autoFocus={false} checked={!!value} onChange={handleChange} id={htmlId} />
      <FieldLabel htmlFor={htmlId} field={{ label, config: { isRequired: false } }} css={{ paddingBottom: '2px' }} />
    </div>
  )
}
