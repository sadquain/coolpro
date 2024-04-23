import {combineReducers} from 'redux';
import Users from './reducers/Users';

export default combineReducers({
    user: Users,

});
