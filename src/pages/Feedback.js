import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import feedbackImage from './images/feedback.png';
import { enableAlternativesButtons, resetScore, updateSettings } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { dispatch, score, email } = this.props;
    const userName = window.localStorage.getItem('username');
    const playersRank = JSON.parse(localStorage.getItem('players Ranking')) || [];
    const buildRank = [...playersRank, { score, userName, email }];
    localStorage.setItem('players Ranking', JSON.stringify(buildRank));
    dispatch(enableAlternativesButtons());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const settings = {
      examId: 0,
      quantity: 10,
    };
    dispatch(updateSettings(settings));
  }

  render() {
    const { assertions, history, dispatch, quantity } = this.props;
    const userName = window.localStorage.getItem('username');
    const minimumAssertions = 3;
    return (
      <section className="feedback-card-container">
        <div className="feedback-card">
          <div className="feedback-user-info">
            <img
              data-testid="header-profile-picture"
              alt="studentsImage"
              src={ feedbackImage }
            />
            <p data-testid="header-player-name" className="score-name-text">{userName}</p>
          </div>

          <p
            data-testid="feedback-text"
            className="feedback-text"
          >
            {assertions < minimumAssertions ? 'Could be better...' : 'Well Done!'}

          </p>

          <div className="score-text">
            Correct:
            <div className="score-text-container">
              <div data-testid="feedback-total-question" className="score-text-number">
                {' '}
                {assertions}
                {' '}
              </div>
              /
              <div className="score-text-number-dark">
                {' '}
                {quantity}
              </div>
            </div>
          </div>
          <div className="buttons-container">

            <button
              className="button play-button"
              data-testid="btn-play-again"
              onClick={ () => {
                dispatch(resetScore());
                history.push('/');
              } }
            >
              Play Again!

            </button>

            <button
              className="button settings-button"
              data-testid="btn-ranking"
              onClick={ () => { history.push('/ranking'); } }
            >
              Ranking

            </button>
          </div>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player, settings }) => ({
  score: player.score,
  assertions: player.assertions,
  email: player.gravatarEmail,
  quantity: settings.quantity,
});

export default connect(mapStateToProps)(Feedback);
