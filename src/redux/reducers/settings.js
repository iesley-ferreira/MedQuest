import { UPDATE_SETTINGS, } from '../actions/actionsName';

const INITIAL_STATE = {
  categoryId: '',
  difficulty: '',
  type: '',
  quantity: 5,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SETTINGS:
    return { ...state,
      categoryId: action.payload.categoryId,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
      quantity: action.payload.quantity };
  default:
    return state;
  }
};

export default settings;
