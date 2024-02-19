import { UPDATE_SETTINGS } from '../actions/actionsName';

const INITIAL_STATE = {
  quantity: 10,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SETTINGS:
    return { ...state,
      quantity: action.payload.quantity,
    };
  default:
    return state;
  }
};

export default settings;
