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
          {nameArtist && `Resultado de álbuns de: ${nameArtist}`}
          {
            exhibitionAlbum
              ? (returnArtist.map((artist) => (
                <Link
                  key={ artist.collectionId }
                  data-testid={ `link-to-album-${artist.collectionId}` }
                  to={ `/album/${artist.collectionId}` }
                >
                  <div>{artist.collectionName}</div>
                </Link>
              )))
              : <p>Nenhum álbum foi encontrado</p>
          }
        </section>
      </section>
    );
  }
}

export default Search;
