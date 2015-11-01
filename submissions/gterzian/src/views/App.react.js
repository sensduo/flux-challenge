
import React from 'react';
import JediContainer from '../containers/JediContainer.react.js'

export default class App extends React.Component {

  render() {
    return (
      <div class="app-container">
        <div class="css-root">
          <h1 class="css-planet-monitor">Obi-Wan currently on Tatooine</h1>
          <JediContainer />
        </div>
      </div>
  );
  }

}
