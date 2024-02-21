import {
  RESET_USEDQUESTIONIDS,
  SET_QUESTION,
  SET_QUESTION_ARRAY,
} from '../actions/actionsName';

const INITIAL_STATE = {
  questionInfo: [
    {
      questionId: 0,
      question: '',
      image: '',
      correctAnswer: '',
      incorrectAnswers: [],
      usedQuestionIds: [],
      questionYear: '',
    },
  ],
  usedQuestionIds: [],
};

const questionInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTION:
    return {
      ...state,
      questionInfo: [action.payload.questionInfo],
    };
  case SET_QUESTION_ARRAY:
    return {
      ...state,
      usedQuestionIds: [...state.usedQuestionIds, action.payload],
    };
  case RESET_USEDQUESTIONIDS:
    return {
      ...state,
      usedQuestionIds: [],
    };
  default:
    return state;
  }
};

export default questionInfo;
