Object.defineProperty(Object.prototype, 'deepEq', {
  enumerable: false,
  value: function(y) {
    if (this === y) return true
    if (!(this instanceof Object) || !(y instanceof Object)) return false
    if (this.constructor !== y.constructor) return false
    for (var p in this) {
      if (!this.hasOwnProperty(p)) continue
      if (!y.hasOwnProperty(p)) return false
      if (this[p] === y[p]) continue
      if (typeof(this[p]) !== "object") return false
      if (!Object.deepEq(this[p], y[p])) return false
    }
    for (p in y) {
      if (y.hasOwnProperty(p) && !this.hasOwnProperty(p)) return false
    }
    return true
  }
})

// Array.prototype.getUnique = function(arr) {
//   const _temp = arr
//   arr.filter((newEl, key) => {
//     for (let oldEl in this) {
//       if (this[oldEl].deepEq(newEl)) {
//         _temp.splice(key, 1)
//         return true
//       }
//     }
//   })
//   return _temp
// }

export const recalculateMatrix = (matrix, step, role) => {
  const _switchRole = role => role === 'white' ? 'black' : 'white'
  const _createNeighbour = (y, x) => ({x: x, y: y})
  const _findNeighbours = (_step, forGroupSearch) => {
    let _neighbours = new Array()

    if (forGroupSearch) {
      matrix[_step.y - 1] !== undefined && matrix[_step.y - 1][_step.x] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y - 1, _step.x))
      matrix[_step.y][_step.x - 1] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y, _step.x - 1))
    } else {
      matrix[_step.y - 1] !== undefined && matrix[_step.y - 1][_step.x] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y - 1, _step.x))
      matrix[_step.y][_step.x + 1] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y, _step.x + 1))
      matrix[_step.y + 1] !== undefined && matrix[_step.y + 1][_step.x] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y + 1, _step.x))
      matrix[_step.y][_step.x - 1] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y, _step.x - 1))
    }
    return _neighbours.length === 0 ? false : _neighbours
  }
  const _findGroups = () => {
    let _groups = {},
        _getGroupId = ((count = 0) => () => `group_${count++}`)(),
        _findInGroups = (cell, _g) => {
          let isExist = false, _groupId
          for (let g in _g) {
            _g[g].map(_cell => {
              if (cell.deepEq(_cell)) {
                isExist = true
                _groupId = g
              }
            })
          }
          return isExist && _groupId || isExist
        }
    matrix.map((row, firstKey) => {
      row.map((cell, secondKey) => {
        if (cell === _switchRole(role)) {
          const _cell = _createNeighbour(firstKey, secondKey)
          if (!_findInGroups(_cell, _groups)) {
            const _neighbours = _findNeighbours(_cell, true)
            if (!_neighbours) {
              let _id = _getGroupId()
              _groups[_id] = []
              _groups[_id].push(_cell)
            } else {
              _neighbours.map(_n => {
                if (_findInGroups(_n, _groups)) _groups[_findInGroups(_n, _groups)].push(_cell)
              })
            }
          }
        }
      })
    })
    console.log(_groups);
  }

  const neighbours = _findNeighbours(step)

  if (!neighbours) {
    return ((_m, _s, _r) => _m[_s.y][_s.x] = _r)(matrix, step, role)
  } else {
    const groups = _findGroups()
  }
}
