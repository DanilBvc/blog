import { combineReducers, createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import userDataReducer from './reducers/userDataReducer';
import postsDataReducer from './reducers/postsDataReducer';
import studioDataReducer from './reducers/studioDataReducer';

const rootReducer = combineReducers({
  userDataReducer,
  postsDataReducer,
  studioDataReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
