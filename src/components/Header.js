import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.recoverName();
  }

  recoverName = () => {
    this.setState({
      loading: true,
    });
    getUser().then(({ name }) => {
      this.setState({
        loading: false,
        userName: name,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    if (loading) {
      return <Carregando />;
    }

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{userName}</p>
      </header>
    );
  }
}

export default Header;
