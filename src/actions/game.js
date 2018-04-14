import { gameTypes } from '../actionTypes'
import { recalculateMatrix } from '../utils'

export const put = ({x, y}) => (dispatch, getState) => {
  let gameState = {
    ...getState().game
  }
  gameState.matrix[y][x] = gameState.role
  const recalculatedMatrix = recalculateMatrix(gameState.matrix, gameState.role)

  dispatch((() => ({
    type: gameTypes.PUT,
    payload: { matrix: gameState.matrix }
  }))())
}
