import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/api';
import { saveEmail, saveName } from '../redux/actions';
import configuracao from './images/configuracao.png';
import logo from './images/logo trivia.png';

class Login extends Component {
  state = {
    email: '',
    username: '',
    disabled: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username } = this.state;
    const { dispatch } = this.props;
    dispatch(saveEmail(email));
    dispatch(saveName(username));
    const { token } = await getToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, username } = this.state;
    const min = 3;
    const higher = 7;
    const validadeInputs = username.length >= min
    && email.length >= higher
    && email.includes('@');
    this.setState({ disabled: !validadeInputs });
  };

  render() {
    const { email, username, disabled } = this.state;
    const { history } = this.props;
    return (
      <section className="login-container">
        <img src={ logo } alt="Page logo" />
        <form
          className="login-form"
          onSubmit={ this.handleSubmit }
        >
          <input
            className="login-input"
            name="username"
            value={ username }
            onChange={ this.handleChange }
            type="text"
            placeholder="Username"
            data-testid="input-player-name"
          />
          <input
            className="login-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
          <input
            className="button play-button"
            type="submit"
            disabled={ disabled }
            value="Play"
            data-testid="btn-play"
          />
          <button
            className="button settings-button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <img src={ configuracao } alt="Settings Icon" className="settings-icon" />
            Settings
          </button>
        </form>
      </section>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
