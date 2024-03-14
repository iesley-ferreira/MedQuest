import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import medImage from './images/medic-icon-ranking.png';
import { resetScore } from '../redux/actions';
import rankingImage from './images/ranking-image.png';

class Ranking extends Component {
  render() {
    const { history, dispatch } = this.props;
    const playersRanked = JSON.parse(localStorage.getItem('players Ranking')) || [];
    playersRanked.sort((a, b) => b.score - a.score);
    playersRanked.length = 5;
    console.log(playersRanked);

    return (
      <section className="ranking-container">
        <div className="ranking-card">
          <img src={ rankingImage } alt="rankingImage" className="ranking-image" />
          <h2 data-testid="ranking-title" className="ranking-title">
            Ranking
          </h2>
          <div className="ranking-peoples">
            {playersRanked.map((player, index) => (
              <div className="player-info-container" key={ index }>
                <img alt="Player Avatar" src={ medImage } className="ranking-avatar" />
                <h4 data-testid={ `player-name-${index}` }>{player.userName}</h4>
                -
                <h4>
                  <span data-testid={ `player-score-${index}` }>{player.score}</span>
                </h4>
              </div>
            ))}
          </div>
          <div className="buttons-container">
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
        </div>
      </section>
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
