import React, {Component} from 'react';
import webApi from '../utils/web-api';

export default class JediScroll extends Component {

  render() {
    console.log(this.props)
    const props = this.props;
    const _scrollUp = () => {
      webApi.getJedi(props.first.master.url);
    };
    const _scrollDown = () => {
      webApi.getJedi(props.last.apprentice.url);
    };
    if(props.scrollable) {
      return (
        <div className="css-scroll-buttons">
          <button className="css-button-up" onClick={_scrollUp}/>
          <button className="css-button-down" onClick={_scrollDown}/>
        </div>
      );
    }
    else {
      if (!props.canUp && !props.canDown) {
        return (
          <div className="css-scroll-buttons">
            <button className="css-button-up css-button-disabled" />
            <button className="css-button-down css-button-disabled" />
          </div>
        );
      }
      else {
        if (!props.canDown) {
          return (
            <div className="css-scroll-buttons">
              <button className="css-button-up" />
              <button className="css-button-down css-button-disabled" />
            </div>
          );
        }
        else {
          return (
            <div className="css-scroll-buttons">
              <button className="css-button-up css-button-disabled" />
              <button className="css-button-down" />
            </div>
          );
        }
      }

    }
  }

};
