import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './styles/App.css';

import { Home } from './pages/Home';
import { EventPage } from './pages/EventPage';
import { Login } from './pages/Login';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { RootStore } from './stores/RootStore';
import { GuideEventPage } from './pages/GuideEventPage';


const App = observer(() => {
  const store = new RootStore();

  return (
    <div className="App">
      <header >
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home eventStore={store.eventStore} />} />
          <Route path='/Event/:id' element={<EventPage eventStore={store.eventStore} />} />
          <Route path='/Guide/Event:id' element={<GuideEventPage eventStore={store.eventStore} />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
});

export default App;
