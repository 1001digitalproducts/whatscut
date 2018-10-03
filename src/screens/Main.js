/**
 * @flow
 */
import type { NavigationScreenProp } from 'react-navigation';
import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
  StatusBar,
  Keyboard,
  Platform,
  Clipboard,
} from 'react-native';
import isEmpty from 'lodash.isempty';
import { Card, Text, Textarea, Form, Label, Icon } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input';
import Menu, { MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import ModalPickerImage from '@components/ModalPickerImage';
import { urlReport, whatsappApi } from '@constants/config';
import colors from '@constants/colors';
import DismissKeyboard from '@components/utils/DismissKeyboard';
import TouchableItem from '@components/utils/TouchableItem';
import { WHATSCUT_LOGO } from '@constants/assets';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NavigationScreenProp<*>,
  dispatch: () => {},
};

export default class Main extends Component<Props> {
  static navigationOptions = { header: null };
  componentDidMount() {
    this.setState({ pickerData: this.phone.getPickerData() });
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  constructor(props) {
    super(props);
    this.state = { message: '', pickerData: null, notelp: '', popMenu: false, keyboardUp: false };
  }

  componentWillMount() {
    this._keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      this.keyboardDidShow.bind(this)
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({ keyboardUp: true });
  }

  keyboardDidHide() {
    this.setState({ keyboardUp: false });
  }

  changePhoneNumber = notelp => {
    this.setState({ notelp });
  };

  changeMessage = message => {
    this.setState({ message });
  };

  copyMessage = () => {
    const { message, notelp } = this.state;
    const dataMessage = encodeURI(message);
    const no = notelp.substr(1);
    let waUri = `${whatsappApi}${no}`;
    if (!isEmpty(message)) {
      waUri = `${waUri}/?text=${dataMessage}`;
    }

    Clipboard.setString(waUri);
    setTimeout(() => alert('Whatsapp link copied!'), 300);
  };

  sendMessage = () => {
    const { message, notelp } = this.state;
    const dataMessage = encodeURI(message);
    const no = notelp.substr(1);
    let waUri = `${whatsappApi}${no}`;
    if (!isEmpty(message)) {
      waUri = `${waUri}/?text=${dataMessage}`;
    }

    Clipboard.setString(waUri);
    Linking.openURL(waUri);
  };

  openMenu = () => {
    this.setState({ popMenu: !this.state.popMenu });
  };

  render() {
    const { navigation } = this.props;
    return (
      <MenuProvider style={{ flex: 1 }}>
        <DismissKeyboard>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

            <View style={styles.header}>
              <Menu
                opened={this.state.popMenu}
                onBackdropPress={() =>
                  this.setState({
                    popMenu: false,
                  })
                }>
                <MenuTrigger style={{ borderRadius: 50, borderWidth: 0 }}>
                  <TouchableItem
                    accessibilityComponentType="button"
                    accessibilityTraits="button"
                    testID="header-back"
                    delayPressIn={0}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: 'transparent',
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                    }}
                    borderless
                    onPress={this.openMenu}>
                    <Icon
                      style={{ color: colors.blackTertiary }}
                      name="dots-vertical"
                      type={`MaterialCommunityIcons`}
                    />
                  </TouchableItem>
                </MenuTrigger>
                <MenuOptions style={{ padding: 10 }}>
                  <MenuOption
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onSelect={() => {
                      this.setState({ popMenu: !this.state.popMenu });
                      Linking.openURL(urlReport);
                    }}>
                    <Ionicons
                      name="md-information-circle"
                      style={{ marginRight: 15 }}
                      size={20}
                      color={colors.blackTertiary}
                    />
                    <Text style={styles.textMenu}>Send Report</Text>
                  </MenuOption>
                  <MenuOption
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onSelect={() => {
                      this.setState({ popMenu: !this.state.popMenu });
                      navigation.navigate('About');
                    }}>
                    <Ionicons
                      name="md-information-circle"
                      style={{ marginRight: 15 }}
                      size={20}
                      color={colors.blackTertiary}
                    />
                    <Text style={styles.textMenu}>About WhatsCut</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>

            <View style={styles.container}>
              {!this.state.keyboardUp && <Image source={WHATSCUT_LOGO} style={styles.logo} />}
              <Card style={styles.cardStyle}>
                <View style={styles.formNumber}>
                  <PhoneInput
                    initialCountry={`id`}
                    ref={ref => {
                      this.phone = ref;
                    }}
                    onChangePhoneNumber={this.changePhoneNumber}
                    value={this.state.notelp}
                    textStyle={{ color: colors.blackPrimary, fontFamily: 'Roboto-Bold' }}
                  />
                </View>
              </Card>
              <Card style={styles.cardStyle}>
                <Form style={styles.formStyle}>
                  <Label style={{ color: '#fff' }}>Alamat</Label>
                  <Textarea
                    rowSpan={6}
                    style={styles.textInput}
                    placeholderTextColor={colors.blackTertiary}
                    value={this.state.message}
                    onChangeText={this.changeMessage}
                    placeholder="Write a message..."
                  />
                </Form>
              </Card>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.copyMessage}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[colors.lightOrange, colors.orange]}
                    style={styles.buttonCircle}>
                    <MaterialIcons name="content-copy" size={28} color={colors.white} />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.sendMessage}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[colors.yellow, colors.green]}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Send</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <ModalPickerImage
                ref={ref => {
                  this.myCountryPicker = ref;
                }}
                data={this.state.pickerData}
                onChange={country => {
                  this.selectCountry(country);
                }}
                cancelText="Cancel"
              />
            </View>
          </View>
        </DismissKeyboard>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    backgroundColor: colors.white,
    flexDirection: 'row-reverse',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  cardStyle: {
    marginBottom: 15,
    borderRadius: 25,
    width: width - 80,
    backgroundColor: colors.white,
  },
  formStyle: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 5,
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 200,
    opacity: 0.75,
  },
  formNumber: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 30,
    padding: 5,
    opacity: 0.75,
  },
  buttonCircle: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginRight: 25,
  },
  buttonStyle: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 50,
    width: width / 3,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  textMenu: {
    color: colors.blackTertiary,
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
  },
  logo: {
    width: 100,
    height: 140,
    resizeMode: 'stretch',
    marginBottom: 50,
  },
  textInput: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: colors.blackPrimary,
  },
});
