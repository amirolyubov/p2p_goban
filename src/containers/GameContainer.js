import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Game } from '../components'
import { gameActions } from '../actions'

class GameContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { gameActions, game } = this.props
    return <Game actions={gameActions} game={game}/>
  }
}

const mapStateToProps = state => ({
  game: state.game
})
const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainer))
