import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

class Settings extends Component {
  state = {
    categories: [],
    categoryId: '',
    difficulty: '',
    type: '',
    quantity: 5,
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    const categories = data.trivia_categories.sort((a, b) => {
      const negativeOne = -1;
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return negativeOne;
      } if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.setState({
      categories,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    const { categoryId, difficulty, type, quantity } = this.state;
    const settings = {
      categoryId, difficulty, type, quantity,
    };
    dispatch(updateSettings(settings));
    history.push('/');
  };

  render() {
    const { categories, categoryId, difficulty, type, quantity } = this.state;
    const numbers = [];
    const maxNumber = 10;
    for (let index = 1; index <= maxNumber; index += 1) {
      numbers.push(index);
    }

    return (
      <form className="settings-container" onSubmit={ this.handleSubmit }>

        <fieldset>
          <legend className="legend1">Settings</legend>
          <label htmlFor="category">
            Categoria:
            <select
              onChange={ this.handleChange }
              name="categoryId"
              id="category"
              value={ categoryId }
            >
              <option value={ -1 }> </option>
              {categories
                .map((category) => (
                  <option
                    key={ category.id }
                    value={ category.id }
                  >
                    {category.name}
                  </option>))}
            </select>
          </label>

          <label htmlFor="quantity">
            Quantidade:
            <select
              onChange={ this.handleChange }
              name="quantity"
              id="quantity"
              value={ quantity }
            >
              {numbers.map((num) => <option key={ num } value={ num }>{num}</option>)}
            </select>
          </label>

          <label htmlFor="difficulty">
            Dificuldade:
            <select
              onChange={ this.handleChange }
              name="difficulty"
              id="difficulty"
              data-testid="difficulty-input"
              value={ difficulty }
            >
              <option value=""> </option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
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
              <option value=""> </option>
              <option value="boolean">Verdadeiro ou Falso</option>
              <option value="multiple">Múltipla escolha</option>
            </select>
          </label>

          <input
            className='button play-button'
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
