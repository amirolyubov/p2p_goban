import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Connect } from '../components'

class ConnectContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return this.props.match.isExact && <Connect />
  }
}

const mapStateToProps = state => ({
  connect: state.connect
})

export default withRouter(connect(mapStateToProps)(ConnectContainer))
