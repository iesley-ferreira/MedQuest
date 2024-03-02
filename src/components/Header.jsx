import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import house from './images/house.png';
import Contador from './Contador';
import { enableAlternativesButtons, updateSettings } from '../redux/actions';

class Header extends Component {
  handleClickHome = () => {
    const { dispatch, history } = this.props;
    const settings = {
      examId: 0,
      quantity: 10,
    };
    dispatch(updateSettings(settings));
    dispatch(enableAlternativesButtons());
    history.push('/');
  };

  render() {
    const { name } = this.props;
    return (
      <header className="header">
        <h3 data-testid="header-player-name" className="header-name">{name}</h3>
        <Contador />
        <button onClick={ this.handleClickHome } type="button" className="home-btn">
          <img src={ house } alt="House" className="house-icon" />
        </button>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Header));
