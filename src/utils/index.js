export const recalculateMatrix = (matrix, role) => {
  const _switchRole = role => role === 'white' ? 'black' : 'white'
  const _checkNeighbors = (matrix, coor, role) => {
    let count = 0;
    (matrix[coor.y][coor.x - 1] === undefined || matrix[coor.y][coor.x - 1] === _switchRole(role)) && count++
    (matrix[coor.y][coor.x + 1] === undefined || matrix[coor.y][coor.x + 1] === _switchRole(role)) && count++
    if (matrix[coor.y + 1] === undefined) {
      count++
    } else if (matrix[coor.y + 1][coor.x] === undefined || matrix[coor.y + 1][coor.x] === _switchRole(role)) count++
    if (matrix[coor.y - 1] === undefined) {
      count++
    } else if (matrix[coor.y - 1][coor.x] === undefined || matrix[coor.y - 1][coor.x] === _switchRole(role)) count++
    if (count === 4) console.log(coor)
    return count
  }
  matrix.map((row, key) => row.map((cell, secondKey) => matrix[key][secondKey] = cell !== null && _checkNeighbors(matrix, {x: secondKey, y: key}, cell) === 4 ? null : cell))
  return matrix
}
