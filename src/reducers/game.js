import { gameTypes } from '../actionTypes'

const initialState = {
  matrix: new Array(15).fill(new Array(15).fill(null))
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
