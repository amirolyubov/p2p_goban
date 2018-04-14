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
    const { game: { matrix } } = this.props
    return (
      <div className='game'>
        <Deck matrix={ matrix }/>
      </div>
    )
  }
}

export default Game
