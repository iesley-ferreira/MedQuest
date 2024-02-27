import { UPDATE_SETTINGS } from '../actions/actionsName';

const INITIAL_STATE = {
  examId: 0,
  quantity: 10,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SETTINGS:
    return { ...state,
      examId: action.payload.examId,
      quantity: action.payload.quantity,
    };
  default:
    return state;
  }
};

export default settings;
