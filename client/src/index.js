import React from 'react';
import ReactDOM from 'react-dom';

import ProfileBuilding from './components/profile-building';

const App = () => {
    // We must always wrap stuff in a parent tag as the first div tag below
    return (
        <div>
            <div>Hi!</div>
            <ProfileBuilding/>
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector('.container'));