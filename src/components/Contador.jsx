import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Contador extends Component {
  render() {
    const { currentQuestionNumber, quantity } = this.props;
    return (
      <h3>
        {currentQuestionNumber}
        {' '}
        /
        {' '}
        {quantity}
      </h3>
    );
  }
}

const mapStateToProps = (state) => ({
  quantity: state.settings.quantity,
  currentQuestionNumber: state.questionInfo.currentQuestionNumber,
});

Contador.propTypes = {
  quantity: PropTypes.number.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Contador);
