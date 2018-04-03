import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import ApiCaller from 'src/utils/ApiCaller'
import reducers from './reducers'

const thunkMiddleware = thunk.withExtraArgument(new ApiCaller())

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
  ))
)

const persistor = persistStore(store)

module.exports = { store, persistor }
