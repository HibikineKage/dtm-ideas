import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BPM_LIST, GENRE_LIST} from './data.js';

function randArray(i_ary){
  const aryKeys = Object.keys(i_ary);
  const index = aryKeys[Math.floor(Math.random() * aryKeys.length)];
  return i_ary[index];
}

function setColor() {
  return '#' + ('00000'+(Math.floor(Math.random()*255*255*255)).toString(16)).slice(-6);
}

function CheckBox(props){
  const {value, name, callback} = props;
  return (
    <div>
      <input
        type="checkbox" 
        id="bpm-checkbox"
        checked={value}
        onChange={callback} />
      <label for="bpm-checkbox">Enable {name}</label>
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bpm: null,
      genre: null,
      color: null,
      showBpm: true,
      showGenre: true,
      showColor: true,
    };
    this.buttonPushedBind = this.buttonPushed.bind(this);
  }
  
  buttonPushed() {
    const {showBpm, showGenre, showColor} = this.state;
    this.setState({
      bpm: showBpm ? randArray(BPM_LIST) : null,
      genre: showGenre ? randArray(GENRE_LIST) : null,
      color: showColor ? setColor() : null,
    });
  }
  
  renderBpm() {
    if(this.state.bpm === null) {
      return null;
    }
    return (
      <div>BPM: {this.state.bpm}</div>
    );
  }
  
  renderGenre() {
    if (this.state.genre === null) {
      return null;
    }
    return (
      <div>Genre: {this.state.genre}</div>
    )
  }
  
  renderColor() {
    if (this.state.color === null) {
      return null;
    }
    const style = {
      backgroundColor: this.state.color,
    };
    return (
      <div style={style}>Color: {this.state.color}</div>
    );
  }
  
  render() {
    const {showBpm, showGenre, showColor} = this.state;
    return (
      <div className="App">
        <h1>DTM Ideas</h1>
        <CheckBox 
          value={showBpm} 
          callback={(e)=>{
            this.setState({showBpm: !showBpm
          })}}
          name="BPM" />
        <CheckBox 
          value={showGenre} 
          callback={(e)=>{
            this.setState({showGenre: !showGenre
          })}}
          name="Genre" />
        <CheckBox
          value={showColor}
          callback={(e)=>{
            this.setState({showColor: !showColor})
          }}
          name="Color" />
        <button onClick={this.buttonPushedBind}>Come on my awesome track!</button>
        {this.state.showBpm && this.renderBpm()}
        {this.state.showGenre && this.renderGenre()}
        {this.state.showColor && this.renderColor()}
      </div>
    );
  }
}

export default App;
