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
    const { questionInfo } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffleArray(allAnswers);
    this.setState({
      shuffledAnswers,
    });
  }

  componentDidUpdate(prevProps) {
    const { questionInfo } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffleArray(allAnswers);
    if (prevProps.questionInfo !== questionInfo) {
      this.setState({
        buttonClicked: false,
        shuffledAnswers,
      });
    }
  }

  handleClick = ({ target }) => {
    const { dispatch, seconds, questionInfo } = this.props;
    if (target.dataset.testid === 'correct-answer') {
      const difficultyEquivalence = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const minScore = 10;
      const score = minScore + (seconds * difficultyEquivalence[questionInfo.difficulty]);
      dispatch(incrementScore(score));
    }
    this.setState({
      buttonClicked: true,
    });
    dispatch(stopTimer());
    dispatch(disableAlternatives());
  };

  render() {
    const { buttonClicked, shuffledAnswers } = this.state;

    const { questionInfo, disableAlternativesButtons } = this.props;
    const treatedQuestionInfoQuestion = questionInfo.question.replace(/&quot;|&#039;/g, (match) => {
      if (match === '&quot;') {
        return '"';
      } if (match === '&#039;') {
        return '\'';
      }
    });
    const
      {
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    return (
      <section className="question-container">

        <div className="question-category-container">
          <h2
            className="category-container"
            data-testid="question-category"
          >
            {questionInfo.category}

          </h2>
          <p
            className="question-container"
            data-testid="question-text"
          >
            {treatedQuestionInfoQuestion}
          </p>

        </div>
        <div
          className="answers-container"
          data-testid="answer-options"
        >
          {shuffledAnswers.map((answer, index) => (
            incorrectAnswers.includes(answer)
              ? (
                <button
                  disabled={ disableAlternativesButtons }
                  className={ buttonClicked ? 'red button' : 'button' }
                  key={ index }
                  data-testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                  type="button"
                  onClick={ this.handleClick }
                >
                  {answer.replace(/&quot;|&#039;/g, (match) => {
                    if (match === '&quot;') {
                      return '"';
                    } if (match === '&#039;') {
                      return '\'';
                    }
                  })}
                </button>
              )
              : (
                <button
                  disabled={ disableAlternativesButtons }
                  className={ buttonClicked ? 'green button' : 'button' }
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  {answer.replace(/&quot;|&#039;/g, (match) => {
                    if (match === '&quot;') {
                      return '"';
                    } if (match === '&#039;') {
                      return '\'';
                    }
                  })}
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
  seconds: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  questionInfo: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  disableAlternativesButtons: globalState.player.disableAlternativesButtons,
});

export default connect(mapStateToProps)(GameSection);
