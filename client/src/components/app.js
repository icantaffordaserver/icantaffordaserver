import React, {Component} from 'react';
import NavBar from './navigation';
import FormBar from '../containers/form-bar';
import FormDetail from '../containers/form-detail';
import EmailsTable from './emails-table';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <FormBar/>

                <div className="row section">
                    <div className="col s5 z-depth-2">
                        <FormDetail/>
                    </div>
                    <div className="col s7 z-depth-2">
                        <EmailsTable/>
                    </div>
                </div>
            </div>
        );
    }
}