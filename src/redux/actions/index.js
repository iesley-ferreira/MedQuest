import {
  SAVE_EMAIL, SAVE_NAME, SAVE_SCORE, GENERATE_RANDOM_INDEX,
  PUSH_ANSWERS_TO_GLOBAL_STATE, STOP_TIMER, RESTART_TIMER,
  DISABLE_ALTERNATIVES_BUTTONS, ENABLE_ALTERNATIVES_BUTTONS,
  INCREMENT_SCORE, RESET_SCORE, UPDATE_SETTINGS,
} from './actionsName';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  score,
  assertions,
});

export const generateRandomIndex = () => ({
  type: GENERATE_RANDOM_INDEX,
});

export const pushAnswersToGlobalState = (results) => ({
  type: PUSH_ANSWERS_TO_GLOBAL_STATE,
  payload: results,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const restartTimer = () => ({
  type: RESTART_TIMER,
});

export const disableAlternatives = () => ({
  type: DISABLE_ALTERNATIVES_BUTTONS,
});

export const enableAlternativesButtons = () => ({
  type: ENABLE_ALTERNATIVES_BUTTONS,
});

export const incrementScore = (score) => ({
  type: INCREMENT_SCORE,
  payload: score,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  payload: settings,
});
