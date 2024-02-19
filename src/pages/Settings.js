import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

class Settings extends Component {
  state = {
    quantity: 10,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: Number(value),
    });
  };

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    const { quantity } = this.state;
    const settings = {
      quantity,
    };
    dispatch(updateSettings(settings));
    history.push('/');
  };

  render() {
    const { quantity } = this.state;

    return (
      <form className="settings-container" onSubmit={ this.handleSubmit }>

        <fieldset>
          <legend className="legend1">Settings</legend>
          {/* <label htmlFor="exame">
            Exame:
            {' '}
            <select
              onChange={ this.handleChange }
              name="exameId"
              id="exame"
              value={ exameId }
            >
              {exames
                .map((exame) => (
                  <option
                    key={ exame.id }
                    value={ exame.id }
                  >
                    {exame.exam}
                  </option>))}
            </select>
          </label> */}

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

          <input
            className="button play-button"
            type="submit"
            value="Salvar"
          />
        </fieldset>

      </form>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Settings);
