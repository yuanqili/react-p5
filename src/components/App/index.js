import React, { Component } from 'react'

import P5Wrapper from '../Processing'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      slider: 100,
      frameRate: null,
    }
  }

  onSetAppState = (newState, cb) => this.setState(newState, cb)

  onSliderChange = (event) => this.setState({ slider: +event.target.value })

  render() {
    return (
      <>
        <P5Wrapper
          p5Props={{ slider: this.state.slider }}
          onSetAppState={this.onSetAppState}
        />

        <div style={{ textAlign: 'center' }}>
          <strong>{this.state.slider}</strong>
          <br />
          <input
            type='range'
            min={5}
            max={290}
            step={1}
            value={this.state.slider}
            style={{ width: '90%', maxWidth: '900px' }}
            onChange={this.onSliderChange}
          />
        </div>

        <p style={{ textAlign: 'center' }}>
          Sketch frame rate:&nbsp;
          <big>
            <strong>{this.state.frameRate}</strong>
          </big>
          &nbsp;fps
        </p>
      </>
    )
  }
}
