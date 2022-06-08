import { useController, useFormContext } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { zipObject, template } from 'lodash'
import axios from 'axios'
import { useUpdateEffect } from 'react-use'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import _ from '@lodash'
import { useTranslation } from 'react-i18next'

const parseOptions = (opts) => {
  return _.map(opts, (v, k) => {
    if (_.isPlainObject(v)) return v

    return { label: v, value: k }
  })
}

const getData = ({queryKey}) => {
  const [_, url] = queryKey
  return axios.get(url).then(res => res.data)
}

const getUrlByDepends = (url, {depends, watchFields}) => {
  let values = zipObject(depends, watchFields)
  return template(url, { interpolate: /{([\s\S]+?)}/g })(values)
}

function AutocompleteField(props) {
  const { queryKey: qk, name, options = [], depends = [], url: rawUrl, defaultValue = '', loading, label, placeholder, ...rest } = props

  const {t} = useTranslation()
  const { control, watch, formState: {errors} } = useFormContext()

  const queryKey = useMemo(() => qk ?? _.uniqueId(`${name}_`), [qk])

  const [url, setUrl] = useState(rawUrl)
  const [enabled, setEnabled] = useState(false)
  const { isLoading, data = [] } = useQuery([queryKey, url], getData, {
    enabled,
  })

  const watchFields = watch(depends)
  const innerLoading = loading || isLoading
  const [items, setItems] = useState(parseOptions(url ? data: options))
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const { field } = useController({ name: name ?? '', control, defaultValue })
  const error = _.get(errors, name)

  useEffect(() => {

    if(!_.isEmpty(depends)){
      if(_.every(watchFields, v => !!v)) {
        setUrl(getUrlByDepends(rawUrl, {depends, watchFields}))
        setEnabled(true)
      }

      if(_.every(watchFields, v => _.isString(v) && v.length === 0)){
        field.onChange('');
        setItems([])
        setUrl(rawUrl)
        setEnabled(false)
      }

    } else {
      setEnabled(true)
    }
  }, [JSON.stringify(watchFields)])

  useUpdateEffect(() => {
    const opts = parseOptions(data)

    setItems(opts)

    if(field.value) setValue(_.find(opts, {value: field.value}))
  }, [JSON.stringify(data)])

  useUpdateEffect(() => {
    const fieldValue = _.find(items, {value: field.value}) ?? null

    setValue(fieldValue)
  }, [JSON.stringify(field.value)])

  return (
    <Autocomplete
      loading={innerLoading}
      fullWidth
      clearOnEscape
      options={items}
      onBlur={field.onBlur}
      onChange={(_event, value) => {
        field.onChange(value?.value ?? '');
      }}
      value={value}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => {
        return option.label ?? option
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={!!error}
            helperText={_.upperFirst(error?.message)}
            placeholder={innerLoading ? t('Loading...') : placeholder}
            label={innerLoading ? `${label} (${t('Loading...')})` : label}
          />
        )
      }}
      {...rest}
    />

  )
  // const { control, watch, setValue, getValues } = useFormContext()
  // const [items, setItems] = useState(options)
  // const watchFields = watch(depends).filter(v => v)
  //
  // useEffect(() => {
  //   if (isEmpty(depends)) {
  //     if (url.length > 0) axios.get(url).then(({ data }) => setItems(data))
  //   } else {
  //     if (!isEmpty(watchFields)) {
  //       let values = zipObject(depends, watchFields)
  //       let parsedUrl = template(url, { interpolate: /{([\s\S]+?)}/g })(values)
  //       axios.get(parsedUrl).then(({ data }) => {
  //         setItems(data)
  //         setValue(name, getValues(name))
  //       })
  //     } else {
  //       setItems([])
  //     }
  //   }
  //
  //
  // }, [JSON.stringify(watchFields)])
  //
  // useUpdateEffect(() => {
  //   setItems(options)
  // }, [JSON.stringify(options)])
  //
  //
  // return (
  //   <Controller
  //     name={name}
  //     control={control}
  //     render={({ field }) => {
  //       if (url && items.length === 0) return (
  //         <TextField label={label} fullWidth className='mt-8 mb-10' variant='outlined' placeholder='Loading...' />
  //       )
  //
  //       return (
  //         <Autocomplete
  //           {...field}
  //           options={items}
  //           getOptionLabel={(option) => {
  //             if (!isPlainObject(option)) return get(items.filter(v => v.value == option), '0.label', '')
  //             return option.label
  //           }}
  //           onChange={(_, data) => {
  //             data && field.onChange(data.value ?? '')
  //           }}
  //           onInputChange={(event, value, reason) => {
  //             if (value === '') field.onChange('')
  //           }}
  //           renderInput={(params) => {
  //             return <TextField {...params} className='mt-8 mb-10' variant='outlined' label={label} />
  //           }}
  //         />
  //       )
  //     }}
  //   />
  // )
}

AutocompleteField.propTypes = {
  name: PropTypes.string.isRequired
}

export default AutocompleteField