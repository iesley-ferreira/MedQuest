import {
  SAVE_EMAIL, SAVE_NAME, SAVE_SCORE, STOP_TIMER, RESTART_TIMER,
  DISABLE_ALTERNATIVES_BUTTONS, ENABLE_ALTERNATIVES_BUTTONS, INCREMENT_SCORE, RESET_SCORE, UPDATE_SETTINGS,
}
  from '../actions/actionsName';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  clearTimer: false,
  disableAlternativesButtons: false,
  categoryId: '',
  difficulty: '',
  type: '',
  quantity: 5,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case STOP_TIMER:
    return {
      ...state, clearTimer: true,
    };
  case RESTART_TIMER:
    return {
      ...state, clearTimer: false,
    };
  case DISABLE_ALTERNATIVES_BUTTONS:
    return {
      ...state, disableAlternativesButtons: true,
    };
  case ENABLE_ALTERNATIVES_BUTTONS:
    return {
      ...state, disableAlternativesButtons: false,
    };
  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return { ...state, assertions: 0, score: 0 };
  default:
    return state;
  }
};

export default player;
