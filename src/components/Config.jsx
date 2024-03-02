import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

const QUEST_QUANTITY_ALL = 217;
const QUEST_QUANTITY_2006 = 38;
const QUEST_QUANTITY_2009 = 39;
const QUEST_QUANTITY_2013 = 38;
const QUEST_QUANTITY_2015 = 39;
const QUEST_QUANTITY_2017 = 39;
const QUEST_QUANTITY_2021 = 38;
const DIVISION_VALUE = 10;

class Config extends Component {
  state = {
    examId: 0,
    quantity: 10,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: Number(value),
      },
      () => {
        const { dispatch } = this.props;
        const { examId, quantity } = this.state;
        const settings = {
          examId,
          quantity,
        };
        dispatch(updateSettings(settings));
      },
    );
  };

  render() {
    const { examId, quantity } = this.state;
    const questQuantity = [
      QUEST_QUANTITY_ALL,
      QUEST_QUANTITY_2006,
      QUEST_QUANTITY_2009,
      QUEST_QUANTITY_2013,
      QUEST_QUANTITY_2015,
      QUEST_QUANTITY_2017,
      QUEST_QUANTITY_2021,
    ];

    // Calcular os valores para as opções
    const maxValue = questQuantity[examId];
    const options = Array
      .from(
        { length: Math.ceil(maxValue / DIVISION_VALUE) },
        (_, index) => Math.min((index + 1) * DIVISION_VALUE, maxValue),
      );

    return (
      <div className="settings-container">

        <fieldset>
          <legend className="legend1">Settings</legend>

          <label htmlFor="examId">
            Ano
            {' '}
            <select
              onChange={ this.handleChange }
              name="examId"
              id="examId"
              data-testid="examId-input"
              value={ examId }
              className="custom-select"
            >
              <option value="0">Todos</option>
              <option value="1">2006</option>
              <option value="2">2009</option>
              <option value="3">2013</option>
              <option value="4">2015</option>
              <option value="5">2017</option>
              <option value="6">2021</option>
            </select>
          </label>

          <label htmlFor="quantity">
            Questões
            {' '}
            <select
              name="quantity"
              id="quantity"
              data-testid="quantity-input"
              value={ quantity }
              onChange={ this.handleChange }
              className="custom-select"
            >
              {options.map((value) => (
                <option key={ value } value={ value }>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Config);
