import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const InputLocation = ({ location, handleLocationChange }) => {
  const inputProps = {
    value: location,
    onChange: handleLocationChange,
    placeholder: 'Select your city',
  }

  return <PlacesAutocomplete inputProps={inputProps} />
}

export default InputLocation
