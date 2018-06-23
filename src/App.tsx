import * as React from 'react';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux'
import JobForm from './components/JobForm/JobForm';
import Map from './components/Map';
import { appReducer } from './redux/appReducer';
import { createRenderer } from 'fela';
import { Provider as FelaProvider } from 'react-fela';


const store = createStore(appReducer);
const renderer = createRenderer();

const App = () => (
    <ReduxProvider store={store}>
        <FelaProvider renderer={renderer}>
            <>
                <Map/>
                <JobForm/>
            </>
        </FelaProvider>
    </ReduxProvider>
);

export default App;
