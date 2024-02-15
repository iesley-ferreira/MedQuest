import { combineReducers } from 'redux';
import player from './player';
import settings from './settings';
import questionInfo from './questionInfo';

const rootReducer = combineReducers({
  player,
  settings,
  questionInfo,
});

export default rootReducer;
