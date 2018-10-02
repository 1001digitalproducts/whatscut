import * as React from 'react';
import { Font } from 'expo';
import { ROBOTO_MEDIUM, ROBOTO_BOLD } from '@constants/assets';

export default class WithFonts extends React.Component {
  state = { ready: false };
  async componentWillMount() {
    await Font.loadAsync({ 'Roboto-Medium': ROBOTO_MEDIUM, 'Roboto-Bold': ROBOTO_BOLD });
    this.setState({ ready: true });
  }

  render() {
    return this.state.ready && this.props.render();
  }
}
