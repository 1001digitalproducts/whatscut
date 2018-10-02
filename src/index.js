import React, { Component } from 'react';
import WithFonts from '@components/utils/WithFonts';
import Routes from './routes';

export default class App extends Component {
  render() {
    return <WithFonts render={() => <Routes />} />;
  }
}
