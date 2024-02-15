import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameSection from '../components/GameSection';
import { restartTimer,
  disableAlternatives, enableAlternativesButtons, setQuestion } from '../redux/actions';
import { getQuestionsFromLocalFile } from '../services/api';

class Game extends Component {
  state = {
    seconds: 10,
    loading: false,
    index: 0,
    buttonClicked: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ loading: true });

    const questionData = getQuestionsFromLocalFile();
    dispatch(
      setQuestion(questionData.results[0], questionData.results[0].usedQuestionIds),
    );

    this.setState({
      loading: false,
    });

    this.startTimer();
  }

  componentDidUpdate() {
    const { clearTimer, seconds, buttonClicked } = this.props;

    if (seconds === 0 && !buttonClicked) {
      this.setState({ buttonClicked: true });
    }

    if (clearTimer) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
    const { history, dispatch } = this.props;

    dispatch(restartTimer());
    this.setState({ seconds: 10, index: index + 1, buttonClicked: false });
    clearInterval(this.timer);

    const questionData = getQuestionsFromLocalFile();

    const maxNumber = 36;
    if (index === maxNumber) {
      history.push('/feedback');
    } else {
      dispatch(
        setQuestion(questionData.results[0], questionData.results[0].usedQuestionIds),
      );
    }

    this.startTimer();
    dispatch(enableAlternativesButtons());
  };

  render() {
    const { loading, seconds, buttonClicked } = this.state;
    const { clearTimer } = this.props;

    return (
      <>
        <Header />
        <div className="wrapper">
          <div>
            {!loading && (
              <GameSection
                seconds={ seconds }
                buttonClicked={ buttonClicked }
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
  buttonClicked: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player, settings }) => ({
  clearTimer: player.clearTimer,
  categoryId: settings.categoryId,
  difficulty: settings.difficulty,
  type: settings.type,
  quantity: settings.quantity,
  examId: settings.examId,
  usedQuestionIds: player.usedQuestionIds,
  question: player.question,
});

export default connect(mapStateToProps)(Game);
