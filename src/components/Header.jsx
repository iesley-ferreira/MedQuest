import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import { generateGravatarURL } from '../services/gravatarFunctions';
import house from './images/house.png';
import Contador from './Contador';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <header className="header">
        <img
          src={ generateGravatarURL(gravatarEmail) }
          alt="avatar"
          data-testid="header-profile-picture"
          className="avatar"
        />
        <h3 data-testid="header-player-name" className="header-name">{name}</h3>

        <Contador />

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
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
