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

// requisito 2: dentro da section que eu tinha criado no requisito 1, eu criei um form, com uma label e dentro dela um input pra pessoa usu??ria poder colocar o nome dela. Depois eu criei um bot??o para a pessoa depois de escrever o nome poder entrar na aplica????o. Para que o bot??o s?? habilite depois que a pessoa escreveu um nome com pelo menos 3 caracteres, eu criei um estado inicial do do nome como string vazia, e criei o estado inicial do meu bot??o como sendo desabilitado, a?? fiz uma fun????o gen??rica de handleChange para fazer essa verifica????o. No par??metro eu desconstru?? o meu target pegando o value, a?? modifiquei o estado do meu nome colocando ele pra receber o meu value (o valor digitado no input), e a?? no meu bot??o, eu coloquei se o valor recebido no meu input a?? usei o .lenght pra saber qual o tamanho, for menor que 3 a?? o bot??o continua desabilitado, se for maior a?? ele habilita. Depois de fazer a verifica????o pra habilitar ou n??o o bot??o, criei um estado novo de loading como sendo false para ele n??o funcionar de in??cio, e criei um estado inicial do meu redirecionamento de p??gina tamb??m como sendo falso. Desconstru?? o meu valueName e informei que ele ?? um estado para poder usar depois. Mudei o estado do meu loading para true, a?? usei a fun????o createUser que eu importei l?? em cima, a?? no par??metro eu passei o objeto que ela esperava receber, colocando o name dessa fun????o recebendo o meu valueName que ?? o nome digitado no input. Como ela ?? uma API e eu preciso esperar o retorno dela, at?? pro carregando aparecer na tela, eu usei o .then, a?? dentro dele eu mudei meu estado novamente, retornando meu loading pra falso e o meu redirect para true. A?? para tudo funcionar como se deve, no meu render, eu desconstru?? os meus estados criados, e fiz minhas verifica????es de if para poder o meu carregando aparecer ou sumir e o meu redirect acontecer ou n??o. E no meu return eu passei pro input atrav??s do onChange a minha fun????o handleChange, o meu valueName para o meu value, e para o meu bot??o eu passei no meu disabled o meu estado de habilitado ou n??o e, no meu onClick eu passei a minha fun????o de clicar.
