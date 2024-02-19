import { SET_QUESTION } from '../actions/actionsName';

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
    console.log('Reducer questionInfo', action.payload.questionInfo);
    console.log('Reducer usedQuestionIds', action.payload.usedQuestionIds);
    return { ...state,
      questionInfo: [action.payload.questionInfo],
      usedQuestionIds: [...action.payload.usedQuestionIds],
    };
  default:
    return state;
  }
};

export default questionInfo;
