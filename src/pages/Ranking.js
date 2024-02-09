import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateGravatarURL } from '../services/gravatarFunctions';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  render() {
    const { history, dispatch } = this.props;
    const playersRanked = JSON.parse(localStorage.getItem('players Ranking')) || [];
    playersRanked.sort((a, b) => b.score - a.score);
    playersRanked.length = 5;

    return (
      <div className="ranking-container">
        <h2 data-testid="ranking-title" className="ranking-title">Ranking</h2>
        <div>
          {playersRanked.map((player, index) => (
            <div className="player-info-container" key={ index }>
              <img
                alt="Player Avatar"
                src={ generateGravatarURL(player.email) }
                className="ranking-avatar"
              />
              <h4 data-testid={ `player-name-${index}` }>
                {player.name}
              </h4>
              <h4>
                <span data-testid={ `player-score-${index}` }>
                  {player.score}
                </span>
              </h4>
            </div>))}
        </div>
        <button
          className="button play-button"
          data-testid="btn-go-home"
          onClick={ () => {
            dispatch(resetScore());
            history.push('/');
          } }
        >
          Go Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
  name: player.name,
  email: player.gravatarEmail,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ranking);
