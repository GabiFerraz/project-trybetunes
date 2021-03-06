import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

// requisito 1: importei o BrowserRouter, o Switch e o Route. Depois, criei a pasta pages e criei todos os componentes pedidos no requisito. Aí aqui eu criei as rotas de cada um. O BrowserRouter é o pai de todos, usei o Switch para renderizar exclusivamente uma rota, depois eu fiz um Route para cada página, usei o exact para abrir exatamente a rota que eu estou passando e não ter problemas pq todas as rotas começam com o / no path, e o component que leva pro componente que eu quero. Para quando a página não for encontrada, eu coloco no path o *.
