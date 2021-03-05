/** @jsx jsx */
import { jsx } from '@emotion/core'
import decamelize from 'decamelize'
import { capitalize } from '../util'

const uniqueKey = (field, index) => `ks-multiinput-cell-${field.path}-${index}`

const subitemsToArrayOfLabelColonValue = (subitems) => {
  const pairs = []
  Object.entries(subitems).forEach(([label, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object') {
        if (value.options && value.selected !== undefined && value.selected !== null) {
          // this subfield is a select, map the selected value to its matching display label
          const selectedOption = value.options.find((option) => option.value === value.selected)
          value = selectedOption ? selectedOption.label : ''
        } else value = ''
      }
      const displayLabel = capitalize(decamelize(label, ' '))
      pairs.push(`${displayLabel}: ${value}`)
    }
  })
  return pairs
}

export default function MultiInputCell({ data, field }) {
  if (data === null) {
    data = field.getDefaultValue()
  }
  if (Array.isArray(data)) {
    return data.map((subitem, index) => {
      const labelColonValues = subitemsToArrayOfLabelColonValue(subitem)
      return (
        <p
          key={uniqueKey(field, index)}
          css={{
            marginBlockStart: '0.2em',
            marginBlockEnd: '0.2em',
          }}
        >
          {labelColonValues.join(', ')}
        </p>
      )
    })
  } else {
    const labelColonValues = subitemsToArrayOfLabelColonValue(data)
    return labelColonValues.map((labelValuePair, index) => (
      <p
        key={uniqueKey(field, index)}
        css={{
          marginBlockStart: '0.2em',
          marginBlockEnd: '0.2em',
        }}
      >
        {labelValuePair}
      </p>
    ))
  }
}
