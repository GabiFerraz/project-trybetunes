import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      // favoriteMusics: [],
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.recoverMusicList();
  }

  handleClick = ({ target }) => {
    const { isFavorite } = this.state;
    this.setState({
      loading: true,
    });
    const { listMusic } = this.props;
    const eachSong = listMusic.filter((music) => String(music.trackId) === target.name); // meu target.name é o meu trackId só que em forma de string, por isso precisei transformar o meu trackId vindo da music em string pq quando ele vem da API ele é um número.
    if (!isFavorite) {
      addSong(...eachSong).then(() => {
        this.setState({
          loading: false,
          isFavorite: true,
        });
      });
    } else {
      removeSong(...eachSong).then(() => {
        this.setState({
          loading: false,
          isFavorite: false,
        });
      });
    }
  }

  recoverMusicList = () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    getFavoriteSongs().then((listFavorites) => {
      this.setState({
        // favoriteMusics: listFavorites,
        loading: false,
        isFavorite: listFavorites.some((music) => music.trackId === trackId),
      });
    });
  }

  // deleteFavorite = () => {
  //   removeSong();
  // }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;

    return (
      <div key={ trackId }>
        { loading && <Carregando /> }
        <h6>{ trackName }</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleClick }
            checked={ isFavorite }
            // onClick={ callback } essa é a prop passada lá no arquivo Album, preciso passar o nome callback na linha 29.
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
