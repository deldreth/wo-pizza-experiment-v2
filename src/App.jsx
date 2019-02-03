import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'nes.css/css/nes.min.css';

import client from './graphql/client';
import Select from './components/Select';
import Cart from './components/Cart';
import reducer from './redux/reducer';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, enhancer(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Select />

          <Cart />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
