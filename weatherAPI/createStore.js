import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './src/reducers/reducers'
import { createStore } from 'redux'

export default () => {

  // const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(reducers, applyMiddleware(thunk))

  return { store }
}
