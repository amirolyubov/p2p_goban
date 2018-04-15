import { gameTypes } from '../actionTypes'
import { recalculateMatrix } from '../utils'

export const put = step => (dispatch, getState) => {
  const gameState = {
    ...getState().game
  }
  const recalculatedMatrix = recalculateMatrix(gameState.matrix, step, gameState.role)

  dispatch((() => ({
    type: gameTypes.PUT,
    payload: { matrix: gameState.matrix }
  }))())
}
