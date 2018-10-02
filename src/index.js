import React, { Component } from 'react';
import WithFonts from '@components/utils/WithFonts';
import Main from './Main';

export default class App extends Component {
  render() {
    return <WithFonts render={() => <Main />} />;
  }
}
