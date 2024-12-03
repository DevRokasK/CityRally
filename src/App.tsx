import React from 'react';
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
import { ProtectedRoute } from './pages/ProtectedRoute';


const App = observer(() => {
  const [store] = React.useState(() => new RootStore());

  return (
    <div className="App">
      <header >
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/Login'
            element={
              <Login userStore={store.userStore} />
            }
          />
          <Route path='/'
            element={
              <ProtectedRoute isLogedin={store.userStore.isLogedin}>
                <Home eventStore={store.eventStore} />
              </ProtectedRoute>
            }
          />
          <Route path='/Event/:id'
            element={
              <ProtectedRoute isLogedin={store.userStore.isLogedin}>
                <EventPage eventStore={store.eventStore} />
              </ProtectedRoute>
            }
          />
          <Route path='/Guide/Event/:id'
            element={
              <ProtectedRoute isLogedin={store.userStore.isLogedin}>
                <GuideEventPage eventStore={store.eventStore} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
});

export default App;
