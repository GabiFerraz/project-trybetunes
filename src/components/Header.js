import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import style from './Header.module.css';
import LogoImgBranca from '../images/LogoImgBranca.png';
import carinhaLogin from '../images/carinhaLogin.png';

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
    const { corDestaqueHeader } = this.props;

    if (loading) {
      return <Carregando />;
    }

    return (
      <header data-testid="header-component" className={ style.header }>
        <section className={ style.firstSection }>
          <img src={ LogoImgBranca } alt="Imagem de Login" className={ style.imgLogo } />
          <section className={ style.secondSection }>
            <img
              src={ carinhaLogin }
              alt="Carinha de Login"
              className={ style.carinhaLogo }
            />
            <p data-testid="header-user-name">{userName}</p>
          </section>
        </section>
        <section className={ style.thirdSection }>
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ corDestaqueHeader === 'search'
              ? style.highlightsGreen : style.highlightsWhite }
          >
            Pesquisa

          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ corDestaqueHeader === 'favorites'
              ? style.highlightsGreen : style.highlightsWhite }
          >
            Favoritas

          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className={ corDestaqueHeader === 'profile'
              ? style.highlightsGreen : style.highlightsWhite }
          >
            Perfil

          </Link>
        </section>
      </header>
    );
  }
}

export default Header;

// requisito 3: criei o componente, exportei... aí dentro do return do render criei uma tag header para envolver todo o conteúdo e coloquei o atributo pedido. Importei esse componente para dentro das páginas das rotas pedidas. Aí antes do render, eu fiz uma função para utilizar a função getUser da UserAPI para recuperar o nome da pessoa logada e exibir essa informação na tela (usei uma tag P para exibir na tela). Na minha função de recuperar o nome, eu alterei o estado do meu loading para aparecer carregando enquanto ele coloca o nome na tela. Aí a minha getUser eu usei o .then por ela ser uma API e eu precisar esperar o retorno dela. No meu then onde eu recebo o retorno eu coloquei o meu name já desestruturado, aí eu abri o meu setState para mudar o estado de novo do meu loading para ele parar de aparecer e para o meu userName receber o retorno da minha getUser. Meu userName é um estado que eu criei lá em cima. Aí pra minha função funcionar da forma correta eu chamei ela no meu componentDidMount que é pra ele carregar na página por último, justamente pq está esperando o retorno da API ?e para que ele não fique depois renderizando novamente toda vez que atualizar a página?.
// requisito 4: criei uma section e dentro da section criei os meus Links, 3, um para cada página que ele deve redirecionar.
