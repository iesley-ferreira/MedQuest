import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import medImage from './images/med-icon.png';
import { resetScore, updateSettings } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { score, name, email } = this.props;
    const playersRank = JSON.parse(localStorage.getItem('players Ranking')) || [];
    const buildRank = [...playersRank, { score, name, email }];
    localStorage.setItem('players Ranking', JSON.stringify(buildRank));
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
    const { name, assertions, history, dispatch, quantity } = this.props;
    const minimumAssertions = 3;
    return (
      <section className="feedback-card">
        <div className="feedback-user-info">

          <img
            data-testid="header-profile-picture"
            alt="Player Avatar"
            src={ medImage }
          />
          <p data-testid="header-player-name" className="score-text">{name}</p>
        </div>

        <p
          data-testid="feedback-text"
          className="feedback-text"
        >
          {assertions < minimumAssertions ? 'Could be better...' : 'Well Done!'}

        </p>

        <p className="score-text">
          Correct Answers:
          {' '}
          <span data-testid="feedback-total-question" className="score-text-number">
            {' '}
            {assertions}
            {' '}
          </span>
          <span className="score-text-number-dark">
            /
            {' '}
            {quantity}
          </span>
        </p>
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

      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
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
  name: player.name,
  email: player.gravatarEmail,
  quantity: settings.quantity,
});

export default connect(mapStateToProps)(Feedback);
