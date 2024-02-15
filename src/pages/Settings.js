import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

class Settings extends Component {
  state = {
    exames: [
      { id: 1, exam: 'HCPA-2006' },
      { id: 2, exam: 'HCPA-2007' },
      { id: 3, exam: 'HCPA-2008' },
    ],
    exameId: 1,
    type: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: Number(value),
    });
  };

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    const { exameId, type } = this.state;
    const settings = {
      exameId, type,
    };
    console.log(exameId);
    dispatch(updateSettings(settings));
    history.push('/');
  };

  render() {
    const { exames, exameId, type } = this.state;

    return (
      <form className="settings-container" onSubmit={ this.handleSubmit }>

        <fieldset>
          <legend className="legend1">Settings</legend>
          <label htmlFor="exame">
            Exame:
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
          </label>

          <label htmlFor="type">
            Tipo:
            <select
              onChange={ this.handleChange }
              name="type"
              id="type"
              data-testid="type-input"
              value={ type }
            >
              <option value="true">Com Tempo</option>
              <option value="false">Sem Tempo</option>
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
