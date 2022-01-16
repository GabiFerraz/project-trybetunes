import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      listMusic: [],
      albumName: '',
      artistBandName: '',
      albumImage: '',
      favoriteMusics: [],
      loading: false,
      // checked: false,
    };
  }

  componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;

    getMusics(id).then((musics) => {
      const returnMusics = musics;
      const songs = returnMusics.filter((type) => type.kind === 'song');
      this.setState({
        albumName: returnMusics[0].collectionName,
        artistBandName: returnMusics[0].artistName,
        albumImage: returnMusics[0].artworkUrl100,
        listMusic: songs,
      });
    });

    this.recoverMusicList();
  }

  recoverMusicList = () => {
    this.setState({
      loading: true,
    });
    getFavoriteSongs().then((listFavorites) => {
      this.setState({
        favoriteMusics: listFavorites,
        loading: false,
      });
    });
  }

  // teste = () => {
  //   console.log('Ruy lindão!!!');
  // } // callback pra passar por props lá embaixo.

  render() {
    const {
      listMusic,
      albumName,
      artistBandName,
      albumImage,
      favoriteMusics,
      loading } = this.state;

    return (
      <>
        <div data-testid="page-album" />
        <Header />
        <section>
          <img src={ albumImage } alt={ albumName } />
          <h5 data-testid="album-name">{ albumName }</h5>
          <h6 data-testid="artist-name">{ artistBandName }</h6>
        </section>
        <section>
          {listMusic.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              listMusic={ listMusic }
              trackId={ trackId }
              // checked={ checked }
              // callback={ this.teste } // primeiro nome é a prop, o que vai dentro é o valor da prop.
            />
          ))}
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }),
}.isRequired;

export default Album;
