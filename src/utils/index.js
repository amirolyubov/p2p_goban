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
Object.defineProperty(Array.prototype, 'deepIncludes', {
  enumerable: false,
  value: function(obj) {
    return !this.every(elem => !elem.eq(obj))
  }
})
Object.defineProperty(Array.prototype, 'equals', {
  enumerable: false,
  value: function(arr) {
    return this.every((elem, key) => elem.eq(arr[key])) // TODO: эта хуета работает только с одинаково отсортированными массивами
  }
})

export const recalculateMatrix = (matrix, step, role) => {
  let data = {
    groups: {} // TODO: выпилить модель и сделать данные только внутри функций
  }
  const _switchRole = role => role === 'white' ? 'black' : 'white'
  const _createNeighbour = (y, x) => ({x: x, y: y})
  const _findNeighbours = (_step, forGroupSearch, forBreatheSearch) => {
    let _neighbours = new Array()

    if (forGroupSearch) {
      matrix[_step.y - 1] !== undefined && matrix[_step.y - 1][_step.x] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y - 1, _step.x))
      matrix[_step.y][_step.x - 1] === (_switchRole(role)) && _neighbours.push(_createNeighbour(_step.y, _step.x - 1))
    } else if (forBreatheSearch) {
      matrix[_step.y - 1] !== undefined && matrix[_step.y - 1][_step.x] !== _switchRole(role) && _neighbours.push(_createNeighbour(_step.y - 1, _step.x))
      matrix[_step.y][_step.x + 1] !== undefined && matrix[_step.y][_step.x + 1] !== _switchRole(role) && _neighbours.push(_createNeighbour(_step.y, _step.x + 1))
      matrix[_step.y + 1] !== undefined && matrix[_step.y + 1][_step.x] !== _switchRole(role) && _neighbours.push(_createNeighbour(_step.y + 1, _step.x))
      matrix[_step.y][_step.x - 1] !== undefined && matrix[_step.y][_step.x - 1] !== _switchRole(role) && _neighbours.push(_createNeighbour(_step.y, _step.x - 1))
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
    const _getGroupId = ((count = 0) => () => count++)()
    matrix.map((row, firstKey) => {
      row.map((cell, secondKey) => {
        if (cell === _switchRole(role)) {
          const _cell = _createNeighbour(firstKey, secondKey)
          if (!_findInGroups(_cell, data.groups)) {
            const _neighbours = _findNeighbours(_cell, true)
            if (!_neighbours) {
              let _id = _getGroupId()
              data.groups[_id] = []
              data.groups[_id].push(_cell)
            } else {
              _neighbours.map(_n => {
                const _groupId = _findInGroups(_n, data.groups)
                if (_groupId) {
                  if (_neighbours.length === 1) {
                    data.groups[_groupId].every(_first => !_first.eq(_cell)) && data.groups[_groupId].push(_cell)
                  } else {
                    const __groups = _neighbours.map(__n => _findInGroups(__n, data.groups))
                    const _newGroupId = Math.max.apply(null, __groups)
                    data.groups[_newGroupId] = data.groups[_newGroupId]
                          .concat(data.groups[_groupId])
                          .map(elem => JSON.stringify(elem))
                          .filter((elem, key, self) => self.indexOf(elem) === key)
                          .map(elem => JSON.parse(elem))
                    data.groups[_newGroupId].every(_first => !_first.eq(_cell)) && data.groups[_newGroupId].push(_cell)
                    _newGroupId != _groupId && delete data.groups[_groupId]
                  }
                }
              })
            }
          }
        }
      })
    })
    return data.groups
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
  const _getBreatheOfGroups = (_groups) => ({
    _breathes: _groups.map(_g => {
        const _breathe = []
        _g.map(_cell =>
          _findNeighbours(_cell, false, true).map(_neighbour =>
            (!_breathe.deepIncludes(_neighbour) || _breathe.length === 0) && _breathe.push(_neighbour)))
        return _breathe
      }),
    _groups: _groups
  })
  const _checkGroupsForDeath = ({_groups, _breathes}) =>
    _breathes.map((_breathe, key) =>
      _breathe.map(_cell => matrix[_cell.y][_cell.x] === role)
              .filter(_item => _item === false).length === 1 ? (_key => _groups[key])(key) : false)
             .filter(_group => typeof _group === 'object')
  const _removeGroups = (_groups) => _groups.map(_group => _group.map(_cell => matrix[_cell.y][_cell.x] = null))

  const neighbours = _findNeighbours(step)

  if (!neighbours) {
    return ((_m, _s, _r) => _m[_s.y][_s.x] = _r)(matrix, step, role)
  } else {
    const deadGroups = _checkGroupsForDeath(_getBreatheOfGroups(_findAttackedGroups(_findGroups(), neighbours)))
    if (deadGroups.length > 0) _removeGroups(deadGroups)
    if (neighbours.length === 4 && deadGroups.length === 0) return matrix // TODO: есть недоработка с разрешением сохранить жизнь своей группе, надо найти
    return ((_m, _s, _r) => _m[_s.y][_s.x] = _r)(matrix, step, role)
  }
}
