import React from 'react';
import ReactDOM from 'react-dom';
import Router from './containers/Router'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import initStore from './utils/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <Provider store={initStore()}>
        <BrowserRouter>
            <MuiThemeProvider>
                <Router/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
