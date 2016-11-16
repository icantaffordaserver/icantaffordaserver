import React, {Component} from 'react';
// same as.. const Component = React.Component;

class ProfileBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {term: ''};
    }

    render() {
        return <input onChange={this.onInputChange}/>;
    }

    // Event Handler for our input element
    onInputChange(event) {
        console.log(event.target.value);
    }
}

export default ProfileBuilder;