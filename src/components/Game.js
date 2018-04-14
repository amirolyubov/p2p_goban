import React, { Component } from 'react'
import Deck from './Deck'
import '../styles/game.scss'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isWhite: true
    }
  }
  render () {
    return (
      <div className='game'>
        <Deck />
      </div>
    )
  }
}

export default Game
