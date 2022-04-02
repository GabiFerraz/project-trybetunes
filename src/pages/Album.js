import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import style from './Album.module.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      listMusic: [],
      albumName: '',
      artistBandName: '',
      albumImage: '',
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
  }

  // teste = () => {
  //   console.log('Ruy lindão!!!');
  // } // callback pra passar por props lá embaixo.

  render() {
    const {
      listMusic,
      albumName,
      artistBandName,
      albumImage } = this.state;

    return (
      <>
        <div data-testid="page-album" />
        <Header />
        <section className={ style.headerMusicCard }>
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

// requisito 7: Chamei a função componentDidMount que é pra ele carregar na página por último, justamente pq está esperando o retorno da API ?e para que ele não fique depois renderizando novamente toda vez que atualizar a página?. Aí eu desconstruí o meu match e params que vem da resposta da minha api pegando exatamente o id que é algo único de cada retorno das músicas. Aí dentro dele chamei a minha getMusics passando como parâmetro o id do álbum que já foi desconstruído e me dando o retorno através do .then, já que ela é a minha api. Aí guardei o meu array de músicas em uma variável e passei um filter nela para guardar apenas as minhas músicas já que o primeiro item do array era só com as informações do álbum e não tinha músicas. Aí alterei o estado do meu albumName para ele receber o nome do álbum que vem da posição 0 do array, o artistBandName para receber o nome do artista, o albumImage para receber a imagem do álbum e o meu listMusic para receber os array dos álbuns de músicas. No meu render eu passei os estados e no return eu chamei meu componente Header, fiz uma section com a imagem, o nome do álbum e o nome do artista, e fiz outra section onde eu fiz um map na minha lista de músicas, desconstruindo no parâmetro para já pegar o que eu queria que era o nome do álbum, o link do endereço da música e o id, passando dentro desse map o meu component MusicCard para poder renderizar na tela do álbum música por música desse álbum.
