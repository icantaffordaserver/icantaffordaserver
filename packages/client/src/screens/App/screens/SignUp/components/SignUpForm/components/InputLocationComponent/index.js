import React, { Component } from 'react'
import PlacesAutoComplete from 'react-places-autocomplete'

class InputLocationComponent extends Component {
  render() {
    const inputProps = {
      value: this.props.location,
      onChange: this.props.handleLocationChange,
      name: this.props.name,
    }
    const styles = {
      autocompleteContainer: { zIndex: '100' },
    }

    return (
      <div>
        <PlacesAutoComplete styles={styles} inputProps={inputProps} />
      </div>
    )
  }
}

export default InputLocationComponent
