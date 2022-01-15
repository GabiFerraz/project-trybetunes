import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleClick = ({ target }) => {
    this.setState({
      loading: true,
    });
    const { listMusic } = this.props;
    const eachSong = listMusic.filter((music) => String(music.trackId) === target.name); // meu target.name é o meu trackId só que em forma de string, por isso precisei transformar o meu trackId vindo da music em string pq quando ele vem da API ele é um número.
    addSong(...eachSong).then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;

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
