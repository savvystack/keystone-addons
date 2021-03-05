/** @jsx jsx */
import { jsx } from '@emotion/core'

const uniqueKey = (field, index) => `ks-multicheckbox-cell-${field.path}-${index}`

export default function MultiCheckboxCell({ data, field }) {
  if (data === null) {
    data = field.getDefaultValue()
  }
  const selectedAsArray = data.selected === null || data.selected === undefined ? [] : Array.isArray(data.selected) ? data.selected : [data.selected]
  return selectedAsArray.map((value, i) => {
    const option = data.options.find((op) => op.value === value)
    return (
      <p
        key={uniqueKey(field, i)}
        css={{
          marginBlockStart: '0.2em',
          marginBlockEnd: '0.2em',
        }}
      >
        {option.label}
      </p>
    )
  })
}
