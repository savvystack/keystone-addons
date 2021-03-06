/** @jsx jsx */

import { jsx } from '@emotion/core'
import { FieldLabel, FieldInput } from '@arch-ui/fields'
import { Input } from '@arch-ui/input'
import Select from '@arch-ui/select'

const expandOptions = (options) => {
  if (typeof options === 'string') {
    return options.split(',').map((option, index) => ({
      value: index,
      label: option.trim(),
    }))
  } else if (Array.isArray(options)) {
    return options.map((option, index) =>
      typeof option === 'object'
        ? option
        : {
            value: index,
            label: opt,
          }
    )
  } else return []
}

export const SubField = ({ htmlId, path, label, value, options, isDisabled, onChange }) => {
  const expandedOptions = expandOptions(options)
  let inputValue = value || ''
  const selectValue = value ? expandedOptions.find((option) => option.value === value.selected) : undefined
  // react-select's `value` prop must be an object reference to one of the options

  const onSelectChange = (option) => {
    if (!option)
      onChange({
        [path]: null,
      })
    else {
      onChange({
        [path]: {
          options: expandedOptions,
          selected: option.value,
        },
      })
    }
  }

  const onInputChange = (event) => onChange({ [path]: event.target.value })

  return (
    <div css={{ marginBottom: 12 }}>
      <FieldLabel field={{ label, config: { isRequired: false } }} css={{ fontSize: '80%', paddingBottom: '4px', whiteSpace: 'nowrap' }} />
      <FieldInput>
        {options ? (
          <Select autoFocus={false} value={selectValue} options={expandedOptions} onChange={onSelectChange} isClearable isDisabled={isDisabled} id={htmlId} />
        ) : (
          <Input autoFocus={false} value={inputValue} onChange={onInputChange} disabled={isDisabled} id={htmlId} />
        )}
      </FieldInput>
    </div>
  )
}
