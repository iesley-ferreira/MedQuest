import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../services/shuffleArray';
import { stopTimer, disableAlternatives, incrementScore } from '../redux/actions';

class GameSection extends Component {
  state = {
    buttonClicked: false,
    shuffledAnswers: [],
  };

  componentDidMount() {
    this.updateShuffledAnswers();
  }

  componentDidUpdate(prevProps) {
    const { questionInfo } = this.props;

    if (questionInfo !== prevProps.questionInfo) {
      this.updateShuffledAnswers();
    }
  }

  handleClick = ({ target }) => {
    const { dispatch } = this.props;

    if (target.dataset.testid === 'correct-answer') {
      dispatch(incrementScore(1));
    }

    this.setState({
      buttonClicked: true,
    });

    dispatch(stopTimer());
    dispatch(disableAlternatives());
  };

  updateShuffledAnswers() {
    const { questionInfo } = this.props;

    if (questionInfo && questionInfo.questionId !== 0) {
      const {
        correctAnswer,
        incorrectAnswers,
      } = questionInfo;

      const allAnswers = [correctAnswer, ...incorrectAnswers];
      const shuffledAnswers = shuffleArray(allAnswers);

      this.setState({
        buttonClicked: false,
        shuffledAnswers,
      });
    }
  }

  render() {
    const { buttonClicked, shuffledAnswers } = this.state;
    const { disableAlternativesButtons, questionInfo, timeOver } = this.props;

    const {
      incorrectAnswers,
    } = questionInfo;

    return (
      <section className="question-container">
        <div className="content-question">
          <h2 className="question-year">
            {questionInfo.questionYear}
          </h2>
          <h1>
            {questionInfo.question}
          </h1>
        </div>
        <div className="answers-container" data-testid="answer-options">
          {shuffledAnswers.map((answer, index) => (
            incorrectAnswers.includes(answer)
              ? (
                <button
                  key={ index }
                  type="button"
                  data-testid={ answer === questionInfo.correctAnswer
                    ? 'correct-answer' : 'wrong-answer' }
                  onClick={ this.handleClick }
                  disabled={ disableAlternativesButtons }
                  className={ buttonClicked || timeOver ? 'red button' : 'button' }
                >
                  {answer}
                </button>
              )
              : (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleClick }
                  disabled={ disableAlternativesButtons }
                  className={ buttonClicked || timeOver ? 'green button' : 'button' }
                >
                  {answer}
                </button>
              )
          ))}
        </div>
      </section>
    );
  }
}

GameSection.propTypes = {
  disableAlternativesButtons: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  questionInfo: PropTypes.shape({
    questionId: PropTypes.number,
    question: PropTypes.string,
    image: PropTypes.string,
    correctAnswer: PropTypes.string,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
    questionYear: PropTypes.string,
  }).isRequired,
  timeOver: PropTypes.bool.isRequired,
};

const mapStateToProps = (globalState) => ({
  disableAlternativesButtons: globalState.player.disableAlternativesButtons,
  seconds: globalState.player.seconds,
  results: globalState.player.results,
  questionInfo: globalState.questionInfo.questionInfo[0],
});

export default connect(mapStateToProps)(GameSection);
