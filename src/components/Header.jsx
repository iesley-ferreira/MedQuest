import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import backHomeBtn from './images/backHeaderBtn.svg';

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
    const name = localStorage.getItem('username');
    return (
      <header className="header">
        <h3 data-testid="header-player-name" className="header-name">{name}</h3>
        <Contador />
        <button
          onClick={ this.handleClickHome }
          type="button"
          className="material-symbols-outlined"
        >
          <img src={ backHomeBtn } alt="Back Home Button" />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Header));
