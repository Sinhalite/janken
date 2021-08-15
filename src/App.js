import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://623c7v9nm9.execute-api.ap-northeast-1.amazonaws.com/v1'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      player_hand: null,
      isSubmitted: false,
      results: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.player_hand === null) {
      this.setState({ error: "手を選択してください" })
      return
    }

    this.setState({ error: null })
    this.setState({ isSubmitted: true })

    axios.post(API_URL, {
      hand: this.state.player_hand
    }).then(res => {
      this.setState({ results: res.data.body })
    })
  }

  onClick(e, value) {
    this.setState({ player_hand: value })
    Array.prototype.slice.call(
      document.getElementsByClassName("active")
    ).forEach(
      function (node) {
        node.classList.remove("active")
      }
    );
    e.currentTarget.classList.add("active")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>無駄に壮大なじゃんけんアプリ</h1>
        </header>
        <div id="button-area">
          <div className="hand-button" onClick={(e) => this.onClick(e, 0)}>グー</div>
          <div className="hand-button" onClick={(e) => this.onClick(e, 1)}>チョキ</div>
          <div className="hand-button" onClick={(e) => this.onClick(e, 2)}>パー</div>
        </div>
        <div id="error">{this.state.error}</div>
        {this.state.isSubmitted &&
          <div id="result">
            <p>
              CPUの出した手は…<br />
              {this.state.results.cpu_hand}
            </p>
            <p>
              {this.state.results.result}
            </p>
          </div>
        }
        <form onSubmit={this.onSubmit}>
          <button type="submit" className="submit-button">勝負</button>
        </form>
      </div>
    );
  }
}

export default App;
