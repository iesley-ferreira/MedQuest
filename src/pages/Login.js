import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveName } from '../redux/actions';
import logo from './images/MedQuest-Logo.png';
import Config from '../components/Config';

class Login extends Component {
  state = {
    username: '',
    disabled: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    const { dispatch } = this.props;

    dispatch(saveName(username));

    const { history } = this.props;
    history.push('/game');
  };

  handleValidate = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { username } = this.state;
    const min = 3;
    const validadeInputs = username.length >= min;
    this.setState({ disabled: !validadeInputs });
  };

  render() {
    const { username, disabled } = this.state;
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
            onChange={ this.handleValidate }
            type="text"
            placeholder="Username"
            data-testid="input-player-name"
          />
          <Config />
          <input
            className="button play-button"
            type="submit"
            disabled={ disabled }
            value="Play"
            data-testid="btn-play"
          />
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
