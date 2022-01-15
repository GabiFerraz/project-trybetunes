import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

const MINCHARACTERS = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      valueName: '',
      isButtonDisabled: true,
      loading: false,
      redirectSearch: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      valueName: value,
      isButtonDisabled: value.length < MINCHARACTERS,
    });
  }

  handleClick = () => {
    const { valueName } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name: valueName }).then(() => {
      this.setState({
        loading: false,
        redirectSearch: true,
      });
    });
  }

  render() {
    const { isButtonDisabled, valueName, loading, redirectSearch } = this.state;

    if (loading) {
      return <Carregando />;
    }
    if (redirectSearch) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        {/* {redirectSearch && <Redirect to="/search" />} */}
        {/* {loading ? <Carregando /> : ( */}
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ valueName }
              placeholder="Nome"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {/* )} */}
      </div>
    );
  }
}

export default Login;
