
import React from 'react';
import App from './views/App.react';
import webApi from './utils/web-api';
import WorldActions from './actions/WorldActions'
import JediActions from './actions/JediActions'

React.render(<App/>, document.getElementById('app'));
webApi.openWs();
webApi.getJedi('http://localhost:3000/dark-jedis/3616').then((jedi) => {
  webApi.getJedi(jedi.apprentice.url, 'Apprentice').then(() => {
    webApi.getJedi(jedi.master.url, 'Master')
  });
});
