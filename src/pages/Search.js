import React from 'react';
import Header from '../components/Header';

const MINCHARACTERS = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      valueName: '',
      isButtonDisabled: true,
    };
  }

  activateButton = ({ target: { value } }) => {
    this.setState({
      valueName: value,
      isButtonDisabled: value.length < MINCHARACTERS,
    });
  }

  render() {
    const { isButtonDisabled, valueName } = this.state;
    return (
      <section data-testid="page-search">
        <Header />
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
            onClick={ this.activateButton }
          >
            Pesquisar
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
