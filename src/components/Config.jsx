import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

class Config extends Component {
  state = {
    examId: 0,
    quantity: 10,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: Number(value),
    }, () => {
      const { dispatch } = this.props;
      const { examId, quantity } = this.state;
      const settings = {
        examId,
        quantity,
      };
      dispatch(updateSettings(settings));
    });
  };

  render() {
    const { examId, quantity } = this.state;

    return (
      <form className="settings-container" onSubmit={ this.handleSubmit }>

        <fieldset>
          <legend className="legend1">Settings</legend>

          <label htmlFor="examId">
            Ano:
            {' '}
            <select
              onChange={ this.handleChange }
              name="examId"
              id="examId"
              data-testid="examId-input"
              value={ examId }
            >
              <option value="0">Todas</option>
              <option value="1">2006</option>
              <option value="2">2009</option>
              <option value="3">2013</option>
              <option value="4">2015</option>
              <option value="5">2017</option>
              <option value="6">2019</option>
              <option value="7">2021</option>
            </select>
          </label>

          <label htmlFor="type">
            Questões:
            {' '}
            <select
              onChange={ this.handleChange }
              name="quantity"
              id="quantity"
              data-testid="quantity-input"
              value={ quantity }
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
            </select>
          </label>

        </fieldset>

      </form>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Config);
