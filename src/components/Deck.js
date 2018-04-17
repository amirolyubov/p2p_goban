import React, { Component } from 'react'

class Cell extends Component {
  render () {
    return (
      <circle x={0} y={0} rx={5} />
    )
  }
}

class Deck extends Component {
  constructor (props) {
    super(props)
  }

  handleCellClick = (cell, x, y) => {
    const { putAction } = this.props
    cell === null && putAction({x, y})
  }

  renderRock (cell, x, y) {
    return <circle className={`rock ${cell !== null && cell}`} cx={x} cy={y} r={`${3}%`}/>
  }
  renderSvg () {
    const { matrix, role } = this.props
    const Row = ({row, keyProp}) => row.map((cell, secondKey) => (
        <g key={secondKey}>
          <line
            x1={secondKey === 0 ? `${3.33 + 6.66 * secondKey}%` : `${6.66 * secondKey}%`}
            y1={`${3.33 + 6.66 * keyProp}%`}
            x2={secondKey === 14 ? `${6.66 * (secondKey + 1) - 3.33}%` : `${6.66 * (secondKey + 1)}%`}
            y2={`${3.33 + 6.66 * keyProp}%`}
            stroke='black'
            />
          <line
            x1={`${3.33 + 6.66 * secondKey}%`}
            y1={keyProp === 0 ? `${3.33 + 6.66 * keyProp}%` : `${6.66 * keyProp}%`}
            x2={`${3.33 + 6.66 * secondKey}%`}
            y2={keyProp === 14 ? `${6.66 * (keyProp + 1) - 3.33}%` : `${6.66 * (keyProp + 1)}%`}
            stroke='black'
            />
          <circle
            cx={`${3.33 + 6.66 * secondKey}%`}
            cy={`${3.33 + 6.66 * keyProp}%`}
            r='2'
            />
          {
            cell !== null && this.renderRock(cell, `${3.33 + 6.66 * secondKey}%`, `${3.33 + 6.66 * keyProp}%`)
          }
          <circle
            onClick={() => this.handleCellClick(cell, secondKey, keyProp)}
            className={`click-helper${cell !== null ? ' __with-rock' : ''} ${role}`}
            cx={`${3.33 + 6.66 * secondKey}%`}
            cy={`${3.33 + 6.66 * keyProp}%`}
            r='3.3%'
            />
        </g>
      )
    )
    return (
      <svg width='100%' height='100%'>
        {
          matrix.map((row, key) => <Row key={key} keyProp={key} row={row}/>)
        }
      </svg>
    )
  }
  render () {
    return (
      <div className='deck'>
        { this.renderSvg() }
      </div>
    )
  }
}

export default Deck
