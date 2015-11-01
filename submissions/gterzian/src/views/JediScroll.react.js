import React, {Component} from 'react';
import webApi from '../utils/web-api';

export default class JediScroll extends Component {

  render() {
    const props = this.props;
    const _scrollUp = () => {
      if(props.scrollable) {
        webApi.getJedi(props.first.master.url);
      }
    };
    const _scrollDown = () => {
      if(props.scrollable) {
        webApi.getJedi(props.last.apprentice.url);
      }
    };
    return (
      <div className="css-scroll-buttons">
        <button className="css-button-up" onClick={_scrollUp}/>
        <button className="css-button-down" onClick={_scrollDown}/>
      </div>
    );
  }

};
