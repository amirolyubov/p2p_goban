import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Game } from '../components'

class GameContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <Game game={this.props.game}/>
  }
}

const mapStateToProps = state => ({
  game: state.game
})

export default withRouter(connect(mapStateToProps)(GameContainer))
