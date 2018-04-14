import React, { Component } from 'react'
import Deck from './Deck'
import '../styles/game.scss'

class Game extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { game: { matrix, role }, actions: { put } } = this.props
    return (
      <div className='game'>
        <Deck
          putAction={ put }
          matrix={ matrix }
          putAction={ put }/>
      </div>
    )
  }
}

export default Game
