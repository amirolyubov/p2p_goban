import { gameTypes } from '../actionTypes'

const mockRender = ({x, y}) => {
  if (x > 3 && x < 9 && y === 5) return 'white'
  return null
}

const initialState = {
  // matrix: new Array(15).fill(null).map(() => new Array(15).fill(null).map(() => Math.random() < 0.2 ? 'white' : Math.random() < 0.4 ? 'black' : null)),
  matrix: new Array(15).fill(null).map((i, key) => new Array(15).fill(null).map((y, senondKey) => mockRender({y: key, x: senondKey}))),
  role: 'black'
}

const game = (state = initialState, action) => {
  switch (action.type) {
    case gameTypes.PUT:
      return {
        ...state,
        matrix: action.payload.matrix
      }
    default:
    return state
  }
}

export default game
