import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import JobForm from './components/JobForm/JobForm';
import Map from './components/Map';
import { appReducer } from './redux/appReducer';

const store = createStore(appReducer);

const App = () => (
    <Provider store={store}>
        <Map/>
        <JobForm/>
    </Provider>
);

export default App;
