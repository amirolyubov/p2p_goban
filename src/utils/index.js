Object.defineProperty(Object.prototype, 'eq', {
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
      if (!Object.eq(this[p], y[p])) return false
    }
    for (p in y) {
      if (y.hasOwnProperty(p) && !this.hasOwnProperty(p)) return false
    }
    return true
  }
})

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
  const _findInGroups = (cell, _g) => {
    let isExist = false, _groupId
    for (let g in _g) {
      _g[g].map(_cell => {
        if (cell.eq(_cell)) {
          isExist = true
          _groupId = g
        }
      })
    }
    return isExist && _groupId || isExist
  }
  const _findGroups = () => {
    let _groups = {},
        _getGroupId = ((count = 0) => () => count++)()
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
                const _groupId = _findInGroups(_n, _groups)
                if (_groupId) {
                  if (_neighbours.length === 1) {
                    _groups[_groupId].every(_first => !_first.eq(_cell)) && _groups[_groupId].push(_cell)
                  } else {
                    const __groups = _neighbours.map(__n => _findInGroups(__n, _groups))
                    const _newGroupId = Math.max.apply(null, __groups)
                    _groups[_newGroupId] = _groups[_newGroupId]
                          .concat(_groups[_groupId])
                          .map(elem => JSON.stringify(elem))
                          .filter((elem, key, self) => self.indexOf(elem) === key)
                          .map(elem => JSON.parse(elem))
                    _groups[_newGroupId].every(_first => !_first.eq(_cell)) && _groups[_newGroupId].push(_cell)
                    _newGroupId != _groupId && delete _groups[_groupId]
                  }
                }
              })
            }
          }
        }
      })
    })
    return _groups
  }
  const _findAttackedGroups = (_groups, _neighbours) => {
    let _neighboursIds = []
    return _neighbours.map(_n => {
      const _id = _findInGroups(_n, _groups)
      if (_neighboursIds.length === 0) {
        _neighboursIds.push(_id)
        return _groups[_id]
      }
      if (!_neighboursIds.includes(_id)) return _groups[_id]
      _neighboursIds.push(_id)
    }).filter(_n => _n)
  }

  const neighbours = _findNeighbours(step)

  if (!neighbours) {
    console.log(role);
    return ((_m, _s, _r) => _m[_s.y][_s.x] = _r)(matrix, step, role)
  } else {
    const neighbourGroups = _findAttackedGroups(_findGroups(), neighbours)

  }
}
