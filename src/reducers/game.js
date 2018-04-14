import { gameTypes } from '../actionTypes'

const initialState = {
  matrix: new Array(15).fill(null).map(() => new Array(15).fill(null).map(() => Math.random() < 0.2 ? 'white' : Math.random() < 0.4 ? 'black' : null)),
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
