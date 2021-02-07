import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';


function App() {
  const store = configureStore();


  return (

    <Provider store={store}>
      <AppRouter />
    </Provider>

  );
}

export default App;
