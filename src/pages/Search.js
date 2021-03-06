import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import style from './Search.module.css';

const MINCHARACTERS = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      valueName: '',
      isButtonDisabled: true,
      loading: false,
      returnArtist: [],
      nameArtist: '',
      exhibitionAlbum: true,
    };
  }

  activateButton = ({ target: { value } }) => {
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
    searchAlbumsAPI(valueName).then((artist) => {
      this.setState({
        nameArtist: valueName,
        valueName: '',
        loading: false,
        returnArtist: artist,
        exhibitionAlbum: artist.length > 0,
      });
    });
  }

  render() {
    const {
      isButtonDisabled,
      valueName,
      loading,
      nameArtist,
      returnArtist,
      exhibitionAlbum } = this.state;

    if (loading) {
      return <Carregando />;
    }

    return (
      <section data-testid="page-search" className={ style.search }>
        <Header corDestaqueHeader="search" />
        <form>
          <label htmlFor="bandArtist">
            <input
              type="text"
              id="bandArtist"
              data-testid="search-artist-input"
              onChange={ this.activateButton }
              value={ valueName }
              placeholder="Nome do Artista"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {nameArtist
          && (
            <h5 className={ style.titleAlbuns }>
              { `Resultado de ??lbuns de: ${nameArtist}` }
            </h5>
          )}
          <section className={ style.albunsDad }>
            {
              exhibitionAlbum
                ? (returnArtist.map((artist) => (
                  <Link
                    key={ artist.collectionId }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                    to={ `/album/${artist.collectionId}` }
                  >
                    <div className={ style.album }>
                      <img src={ artist.artworkUrl100 } alt="Imagem do ??lbum" />
                      <span className={ style.tagA }>{artist.collectionName}</span>
                    </div>
                  </Link>
                )))
                : <p>Nenhum ??lbum foi encontrado</p>
            }
          </section>
        </section>
      </section>
    );
  }
}

export default Search;

// requisito 5: criei um form, coloquei uma label com um input para que o usu??rio possa digitar o nome do artista ou da banda e criei um bot??o de pesquisar que s?? deve ser habilitado caso o nome do artista tenha 2 ou mais caracteres (fiz uma fun????o para isso - activateButton, onde o estado valueName vai receber o valor digitado no input e o estado do bot??o desabilitado vai ser habilitado quando atingir os caracteres m??nimos).
// requisito 6:  Fiz a fun????o do click do bot??o onde eu coloco o carregando na tela, chamo a minha API passando como par??metro o nome do artista digitado no imput (valueName), uso o .then para esperar o retorno da api e passo como par??metro o retorno esperado, a?? mudo os meus estados para que o nameArtist receba o valor digitado no input, o input seja limpo, o carregando suma da tela, ele retorne todos os ??lbuns do artista esperado, e exiba na tela se existir um resultado, se n??o existir, como na condicional do return, vai aparecer a informa????o que nnenhum ??lbum foi encontrado.
