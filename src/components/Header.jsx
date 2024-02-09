import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { generateGravatarURL } from '../services/gravatarFunctions';
import house from './images/house.png';

class Header extends Component {
  handleClick = () => {
    console.log(this.props);
  };

  render() {
    const { name, score, gravatarEmail, history } = this.props;
    return (
      <header className="header">
        <img
          src={ generateGravatarURL(gravatarEmail) }
          alt="avatar"
          data-testid="header-profile-picture"
          className="avatar"
        />
        <h3 data-testid="header-player-name" className="header-name">{name}</h3>
        <h3 data-testid="header-score" className="header-score">
          SCORE:
          {' '}
          {score}
        </h3>

        <Link to="/">
          {' '}
          <img src={ house } alt="House" className="house-icon" />
        </Link>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
