import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './styles/App.css';

import { Home } from './pages/Home';
import { Event } from './pages/Event';
import { Login } from './pages/Login';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';


const App = observer(() => {
  return (
    <div className="App">
      <header >
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Event' element={<Event />} />
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
