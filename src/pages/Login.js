import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import style from './Login.module.css';
import LogoImg from '../images/LogoImg.png';

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
      <section data-testid="page-login" className={ style.login }>
        {/* {redirectSearch && <Redirect to="/search" />} */}
        {/* {loading ? <Carregando /> : ( */}
        <img src={ LogoImg } alt="Imagem de Login" />
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
      </section>
    );
  }
}

export default Login;

// requisito 2: dentro da section que eu tinha criado no requisito 1, eu criei um form, com uma label e dentro dela um input pra pessoa usuária poder colocar o nome dela. Depois eu criei um botão para a pessoa depois de escrever o nome poder entrar na aplicação. Para que o botão só habilite depois que a pessoa escreveu um nome com pelo menos 3 caracteres, eu criei um estado inicial do do nome como string vazia, e criei o estado inicial do meu botão como sendo desabilitado, aí fiz uma função genérica de handleChange para fazer essa verificação. No parâmetro eu desconstruí o meu target pegando o value, aí modifiquei o estado do meu nome colocando ele pra receber o meu value (o valor digitado no input), e aí no meu botão, eu coloquei se o valor recebido no meu input aí usei o .lenght pra saber qual o tamanho, for menor que 3 aí o botão continua desabilitado, se for maior aí ele habilita. Depois de fazer a verificação pra habilitar ou não o botão, criei um estado novo de loading como sendo false para ele não funcionar de início, e criei um estado inicial do meu redirecionamento de página também como sendo falso. Desconstruí o meu valueName e informei que ele é um estado para poder usar depois. Mudei o estado do meu loading para true, aí usei a função createUser que eu importei lá em cima, aí no parâmetro eu passei o objeto que ela esperava receber, colocando o name dessa função recebendo o meu valueName que é o nome digitado no input. Como ela é uma API e eu preciso esperar o retorno dela, até pro carregando aparecer na tela, eu usei o .then, aí dentro dele eu mudei meu estado novamente, retornando meu loading pra falso e o meu redirect para true. Aí para tudo funcionar como se deve, no meu render, eu desconstruí os meus estados criados, e fiz minhas verificações de if para poder o meu carregando aparecer ou sumir e o meu redirect acontecer ou não. E no meu return eu passei pro input através do onChange a minha função handleChange, o meu valueName para o meu value, e para o meu botão eu passei no meu disabled o meu estado de habilitado ou não e, no meu onClick eu passei a minha função de clicar.
