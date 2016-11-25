/**
 * Created by alexandermann on 2016-11-22.
 */

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import ActiveForm from './reducer_active_form';
import GetTableData from './reducer_fetch_emails_sent';


const rootReducer = combineReducers({
    activeForm: ActiveForm, // creates the activeForm piece of state see container form-detail
    emails: GetTableData, // creates the activeForm piece of state see container form-detail
    form: formReducer
});

export default rootReducer;