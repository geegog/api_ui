import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Routes from './router';
import AppHeader from './components/common/AppHeader';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Routes />
      </div>
    );
  }
}

export default App;
