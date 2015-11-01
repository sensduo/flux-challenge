
import React from 'react';
import App from './views/App.react';
import webApi from './utils/web-api';
import WorldActions from './actions/WorldActions'

React.render(<App/>, document.getElementById('app'));
webApi.openWs();
webApi.getJedi(3616);
