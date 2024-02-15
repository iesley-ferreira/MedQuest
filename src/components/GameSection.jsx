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
    const { questionInfo, buttonClicked } = this.props;
    // Verifica se houve uma mudança nas props
    if (buttonClicked === true) {
      this.setState({
        buttonClicked: true,
      });
    }
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

    // Verifica se questionInfo está disponível antes de acessar suas propriedades
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
    console.log('GameSection props:', this.props);
    const { buttonClicked, shuffledAnswers } = this.state;
    const { disableAlternativesButtons, questionInfo } = this.props;
    console.log('shuffle', questionInfo);

    const {
      incorrectAnswers,
    } = questionInfo;

    return (
      <section className="question-container">
        <div className="content-question">
          <h3>
            {questionInfo.question}
          </h3>
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
                  className={ buttonClicked ? 'red button' : 'button' }
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
                  className={ buttonClicked ? 'green button' : 'button' }
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
  }).isRequired,
  buttonClicked: PropTypes.bool.isRequired,
};

const mapStateToProps = (globalState) => ({
  disableAlternativesButtons: globalState.player.disableAlternativesButtons,
  seconds: globalState.player.seconds,
  results: globalState.player.results,
  questionInfo: globalState.questionInfo.questionInfo[0],
});

export default connect(mapStateToProps)(GameSection);
