
import React from 'react';
import JediContainer from '../containers/JediContainer.react.js'

export default class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <div className="css-root">
          <h1 className="css-planet-monitor">Obi-Wan currently on Tatooine</h1>
          <JediContainer />
        </div>
      </div>
  );
  }

}
