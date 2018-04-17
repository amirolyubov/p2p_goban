import { gameTypes } from '../actionTypes'

const mockRender = ({x, y}) => {
  if (x > 3 && x < 10 && (y === 6 || y === 8)) return 'white'
  if (x > 3 && x < 10 && (y === 6 || y === 11)) return 'white'
  // if (x === 9 || (y > 9 && y < 11)) return 'white'
  // if (x > 3 && x < 9 && (y === 5)) return 'white'
  if ((x === 5 || x === 7) && (y > 3 && y < 8)) return 'white'
  if (y === 8 && (x > 2 && x < 10)) return 'white'
  return null
}

const initialState = {
  // matrix: new Array(15).fill(null).map((i, key) => new Array(15).fill(null).map((y, senondKey) => mockRender({y: key, x: senondKey}))),
  matrix: new Array(15).fill(null).map(() => new Array(15).fill(null).map(y => Math.random() < 0.2 ? 'white' : Math.random() < 0.2 ? 'black': null)),
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
