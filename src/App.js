import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BPM_LIST, GENRE_LIST, KEYS} from './data.js';

function randArray(i_ary){
  const aryKeys = Object.keys(i_ary);
  const index = aryKeys[Math.floor(Math.random() * aryKeys.length)];
  return i_ary[index];
}

function randomColor() {
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

function valueMap(input, inputMin, inputMax, outputMin, outputMax) {
  return (input - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
}

function randomBpm(genre) {
  const {bpmMax, bpmMin} = GENRE_LIST[genre];
  return Math.floor(valueMap(Math.random(), 0, 1, bpmMin, bpmMax))
}

function randomGenre() {
  return randArray(Object.keys(GENRE_LIST))
}

function randomKey() {
  return randArray(KEYS) + (Math.random() > 0.5 ? '' : 'm');
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bpm: null,
      genre: null,
      color: null,
      key: null,
      showBpm: true,
      showGenre: true,
      showColor: true,
      showKey: true,
    };
    this.buttonPushedBind = this.buttonPushed.bind(this);
  }
  
  buttonPushed() {
    const {showBpm, showGenre, showColor, showKey} = this.state;
    const genre = randomGenre();
    const bpm = randomBpm(genre);
    this.setState({
      bpm: showBpm ? bpm : null,
      genre: showGenre ? genre : null,
      color: showColor ? randomColor() : null,
      key: showKey ? randomKey() : null,
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
  
  renderKey() {
    if (this.state.key === null) {
      return null;
    }
    return (
      <div>Key: {this.state.key}</div>
    );
  }
  
  render() {
    const {showBpm, showGenre, showColor, showKey} = this.state;
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
        <CheckBox
          value={showKey}
          callback={(e)=>{
            this.setState({showKey: !showKey})
          }}
          name="Key" />
          
        <button onClick={this.buttonPushedBind}>Come on my awesome track!</button>
        {this.state.showBpm && this.renderBpm()}
        {this.state.showGenre && this.renderGenre()}
        {this.state.showColor && this.renderColor()}
        {this.state.showKey && this.renderKey()}
      </div>
    );
  }
}

export default App;
