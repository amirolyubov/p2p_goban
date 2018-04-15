Object.prototype.equals = function(y) {
  if (this === y) return true
  if (!(this instanceof Object) || !(y instanceof Object)) return false
  if (this.constructor !== y.constructor) return false
  for (var p in this) {
    if (!this.hasOwnProperty(p)) continue
    if (!y.hasOwnProperty(p)) return false
    if (this[p] === y[p]) continue
    if (typeof(this[p]) !== "object") return false
    if (!Object.equals(this[p], y[p])) return false
  }
  for (p in y) {
    if (y.hasOwnProperty(p) && !this.hasOwnProperty(p)) return false
  }
  return true
}

Array.prototype.getUnique = function(arr) {
  const _temp = arr
  arr.filter((newEl, key) => {
    for (let oldEl in this) {
      if (this[oldEl].equals(newEl)) {
        _temp.splice(key, 1)
        return true
      }
    }
  })
  return _temp
}

export const recalculateMatrix = (matrix, step, role) => {
  const _switchRole = role => role === 'white' ? 'black' : 'white'
  const _createNeighbour = (y, x) => ({x: x, y: y})
  const _findNeighbours = (_step, isEnemies) => {
    let _neighbours = new Array()

    matrix[_step.y - 1] !== undefined && matrix[_step.y - 1][_step.x] === (isEnemies ? _switchRole(role) : role) && _neighbours.push(_createNeighbour(_step.y - 1, _step.x))
    matrix[_step.y][_step.x + 1] === (isEnemies ? _switchRole(role) : role) && _neighbours.push(_createNeighbour(_step.y, _step.x + 1))
    matrix[_step.y + 1] !== undefined && matrix[_step.y + 1][_step.x] === (isEnemies ? _switchRole(role) : role) && _neighbours.push(_createNeighbour(_step.y + 1, _step.x))
    matrix[_step.y][_step.x - 1] === (isEnemies ? _switchRole(role) : role) && _neighbours.push(_createNeighbour(_step.y, _step.x - 1))
    return _neighbours
  }
  const _findNeighbours__recur = (arr) => {
    let _tempArr = arr || []

    arr.map(n => {
      _tempArr.push(n)
      console.log(_tempArr.getUnique(_findNeighbours(n, true)).length);
      if (_tempArr.getUnique(_findNeighbours(n, true)) !== 1) {
        _findNeighbours__recur(_tempArr.concat(_tempArr.getUnique(_findNeighbours(n, true))))
      }
    })
  }

  const neighbours = _findNeighbours(step, true)

  if (neighbours.length === 0) {
    return ((_m, _s, _r) => _m[_s.y][_s.x] = _r)(matrix, step, role)
  } else {
    const groups = _findNeighbours__recur(neighbours)
    return matrix
  }
}
