import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import reducers from './reducers'
import { ConnectContainer, GameContainer } from './containers'

const history = createHistory()
const routerMW = routerMiddleware(history)
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), applyMiddleware(thunk, routerMW))

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
      <HashRouter>
        <div className='router-wrapper'>
          <Route path={'/'} component={ConnectContainer}/>
          <Route path={'/:roomId'} component={GameContainer}/>
        </div>
      </HashRouter>
  </ConnectedRouter>
</Provider>,
document.getElementById('app'))
