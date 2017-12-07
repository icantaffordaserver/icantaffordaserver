import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const InputLocation = ({ location, handleLocationChange }) => {
  const inputProps = {
    value: location,
    onChange: handleLocationChange,
    placeholder: 'Enter your city name.',
  }

  return <PlacesAutocomplete inputProps={inputProps} />
}

export default InputLocation
