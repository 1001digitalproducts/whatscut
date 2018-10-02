import * as React from 'react';
import { Font } from 'expo';

export default class WithFonts extends React.Component {
  state = { ready: false };
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto-Medium': require('../../../assets/fonts/Roboto/Roboto-Medium.ttf'),
      Roboto_medium: require('../../../assets/fonts/Roboto/Roboto-Medium.ttf'),
      'Roboto-Bold': require('../../../assets/fonts/Roboto/Roboto-Bold.ttf'),
    });

    this.setState({ ready: true });
  }

  render() {
    return this.state.ready && this.props.render();
  }
}
