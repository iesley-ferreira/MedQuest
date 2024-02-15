import { UPDATE_SETTINGS } from '../actions/actionsName';

const INITIAL_STATE = {
  examId: '',
  type: '',
  quantity: 37,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SETTINGS:
    return { ...state,
      examId: action.examId,
      type: action.type,
    };
  default:
    return state;
  }
};

export default settings;
