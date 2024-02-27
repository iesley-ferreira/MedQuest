import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameSection from '../components/GameSection';
import { restartTimer,
  disableAlternatives,
  enableAlternativesButtons,
  setQuestion,
  resetUsedQuestionIds,
  setQuestionArray,
  resetQuestionNumber,
  incrementQuestionNumber,
} from '../redux/actions';
import { getQuestionsFromLocalFile } from '../services/api';

class Game extends Component {
  state = {
    seconds: 270,
    loading: false,
    index: 0,
  };

  async componentDidMount() {
    const { dispatch, usedQuestionIds, examId } = this.props;
    this.setState({ loading: true });

    const questionData = getQuestionsFromLocalFile(examId, usedQuestionIds);
    dispatch(setQuestion(questionData.results[0]));
    dispatch(setQuestionArray(questionData.results[0].usedQuestionId));

    this.setState({
      loading: false,
    });

    this.startTimer();
  }

  componentDidUpdate() {
    const { clearTimer } = this.props;

    if (clearTimer) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    clearInterval(this.timer);
    dispatch(resetQuestionNumber());
  }

  startTimer = () => {
    const { dispatch } = this.props;
    const second = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 });
      } else {
        clearInterval(this.timer);
        dispatch(disableAlternatives());
      }
    }, second);
  };

  handleClick = () => {
    const { index } = this.state;
    const { history, dispatch, quantity, usedQuestionIds, examId } = this.props;

    dispatch(restartTimer());
    this.setState({ seconds: 270, index: index + 1 });
    clearInterval(this.timer);
    const questionData = getQuestionsFromLocalFile(examId, usedQuestionIds);

    if (index === quantity - 1) {
      history.push('/feedback');
      dispatch(resetUsedQuestionIds());
      dispatch(resetQuestionNumber());
    } else {
      dispatch(setQuestion(questionData.results[0]));
      dispatch(setQuestionArray(questionData.results[0].usedQuestionId));
      dispatch(incrementQuestionNumber());
    }
    this.startTimer();
    dispatch(enableAlternativesButtons());
  };

  render() {
    const { loading, seconds } = this.state;
    const { clearTimer } = this.props;
    const timeOver = seconds === 0;

    return (
      <>
        <Header />
        <div className="wrapper">
          <div>
            {!loading && (
              <GameSection
                seconds={ seconds }
                timeOver={ timeOver }
              />
            )}
            {(clearTimer || seconds === 0) && (
              <button
                className="button next-button"
                data-testid="btn-next"
                onClick={ this.handleClick }
              >
                {seconds === 0 ? 'Time is over - Next question' : 'Next'}
              </button>
            )}
            {(seconds > 0 && !clearTimer && !loading) && (
              <button
                className="button next-button timer-button"
                data-testid="btn-next"
              >
                {seconds}
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clearTimer: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  usedQuestionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  examId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player, settings, questionInfo }) => ({
  clearTimer: player.clearTimer,
  categoryId: settings.categoryId,
  difficulty: settings.difficulty,
  type: settings.type,
  quantity: settings.quantity,
  examId: settings.examId,
  usedQuestionIds: questionInfo.usedQuestionIds,
  question: player.question,
  questionYear: player.questionYear,
});

export default connect(mapStateToProps)(Game);
