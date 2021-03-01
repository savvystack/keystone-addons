/** @jsx jsx */

import { jsx } from '@emotion/core'
import { FieldLabel, FieldInput } from '@arch-ui/fields'
import { Input } from '@arch-ui/input'
import Select from '@arch-ui/select'

const expandOptions = (options) => {
  if (typeof options === 'string') {
    return options.split(',').map((opt, index) => ({
      value: index,
      label: opt.trim(),
    }))
  } else if (Array.isArray(options)) {
    return options.map((opt, index) =>
      typeof opt === 'object'
        ? opt
        : {
            value: index,
            label: opt,
          }
    )
  } else return []
}

const findOption = (value, options) => options.find((i) => i.value === value)

export const SubField = ({ htmlId, path, label, value, options, isDisabled, onChange }) => {
  const inputValue = value || ''
  const expandedOptions = expandOptions(options)
  return (
    <div css={{ marginBottom: 12 }}>
      <FieldLabel field={{ label, config: { isRequired: false } }} css={{ fontSize: '80%', paddingBottom: '4px', whiteSpace: 'nowrap' }} />
      <FieldInput>
        {options ? (
          <Select
            autoFocus={false}
            value={findOption(value, expandedOptions) ?? null}
            options={expandedOptions}
            onChange={(option) => onChange({ [path]: option ? option.value : null })}
            isClearable
            isDisabled={isDisabled}
            id={htmlId}
          />
        ) : (
          <Input autoFocus={false} value={inputValue} onChange={(event) => onChange({ [path]: event.target.value })} disabled={isDisabled} id={htmlId} />
        )}
      </FieldInput>
    </div>
  )
}
