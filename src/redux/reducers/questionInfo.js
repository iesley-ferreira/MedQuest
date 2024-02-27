import {
  INCREMENT_QUESTION_NUMBER,
  RESET_QUESTION_NUMBER,
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
  usedQuestionIds: {
    exam1: [],
    exam2: [],
    exam3: [],
    exam4: [],
    exam5: [],
    exam6: [],
    exam7: [],
  },
  currentQuestionNumber: 1,
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
      usedQuestionIds: {
        ...state.usedQuestionIds,
        [`exam${action.payload.examId}`]: [
          ...(state.usedQuestionIds[`exam${action.payload.examId}`] || []),
          action.payload.questionId,
        ],
      },
    };
  case RESET_USEDQUESTIONIDS:
    return {
      ...state,
      usedQuestionIds: {
        exam1: [],
        exam2: [],
        exam3: [],
        exam4: [],
        exam5: [],
        exam6: [],
        exam7: [],
      },
    };
  case INCREMENT_QUESTION_NUMBER:
    return {
      ...state,
      currentQuestionNumber: state.currentQuestionNumber + 1,
    };
  case RESET_QUESTION_NUMBER:
    return {
      ...state,
      currentQuestionNumber: 1,
    };
  default:
    return state;
  }
};

export default questionInfo;
