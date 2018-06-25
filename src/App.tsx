import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux'
import { JobForm } from './components/JobForm/JobForm';
import Map from './components/Map/Map';
import { appReducer } from './redux/appReducer';
import { createRenderer } from 'fela';
import { Provider as FelaProvider } from 'react-fela';
import createSagaMiddleware from 'redux-saga';
import { appSaga } from './redux/appSaga';
const logger: any = require('redux-logger').default;


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware, logger),
);
const renderer = createRenderer();

sagaMiddleware.run(appSaga);

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
