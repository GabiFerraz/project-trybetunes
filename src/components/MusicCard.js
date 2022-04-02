import React from 'react';
import PropTypes from 'prop-types';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
// import Carregando from './Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import style from './MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      // loading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.recoverMusicList();
  }

  handleClick = () => {
    const { isFavorite } = this.state;
    const { trackId } = this.props;
    // this.setState({
    //   loading: true,
    // });
    const { listMusic } = this.props;
    const eachSong = listMusic.filter((music) => (
      music.trackId === trackId)); // meu target.name é o meu trackId só que em forma de string, por isso precisei transformar o meu trackId vindo da music em string pq quando ele vem da API ele é um número.
    if (!isFavorite) {
      addSong(...eachSong).then(() => {
        this.setState({
          // loading: false,
          isFavorite: true,
        });
      });
    } else {
      removeSong(...eachSong).then(() => {
        this.setState({
          // loading: false,
          isFavorite: false,
        });
      });
    }
  }

  recoverMusicList = () => {
    const { trackId } = this.props;
    // this.setState({
    //   loading: true,
    // });
    getFavoriteSongs().then((listFavorites) => {
      this.setState({
        // loading: false,
        isFavorite: listFavorites.some((music) => music.trackId === trackId),
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite } = this.state;

    return (
      <section key={ trackId } className={ style.musicCard }>
        {/* { loading && <Carregando /> } */}
        <h6>{ trackName }</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {/* <label htmlFor="favorite"> */}
        {/* <spam>Favorita</spam> */}
        {/* <input
            type="checkbox"
            id="favorite"
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleClick }
            checked={ isFavorite }
          /> */}
        {/* { isFavorite
            ? <BsSuitHeartFill className={ style.heartRed } />
            : <BsSuitHeart className={ style.heart } /> } */}
        {/* </label> */}
        <button type="button" onClick={ this.handleClick }>
          { isFavorite
            ? <BsSuitHeartFill className={ style.heartRed } />
            : <BsSuitHeart className={ style.heart } /> }
        </button>
      </section>
      // Criei uma label com um input do tipo checkbox para poder favoritar a música
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;

// Finalizando Requisito 7: // No meu render, passei as minhas props vindas do componente Album que é pai deste componente, e o meu estado carregando. Aí no return eu coloquei uma div com a chave sendo o id da música, coloquei o condicional de se o loading for verdadeiro deve renderizar o componente Carregando..., aí fiz um h6 com o nome da música, e o player para tocar o preview da música, pasasndo no src o endereço dessa música.

// Requisito 8:
