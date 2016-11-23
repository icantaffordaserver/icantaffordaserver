import React, {Component} from 'react';
import NavBar from './navigation';
import FormBar from '../containers/form-bar';
import FormDetail from '../containers/form-detail';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <FormBar/>
                <FormDetail/>
            </div>
        );
    }
}