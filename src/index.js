import Expo, { LinearGradient } from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
  StatusBar,
} from 'react-native';
import { Card, CardItem, Body, Text, Textarea, Form, Label, Icon, Button } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import ModalPickerImage from '@components/ModalPickerImage';
import Modal from 'react-native-modal';
import { urlReport, appVersion, whatsappApi } from '@constants/config';
import colors from '@constants/colors';

const { width } = Dimensions.get('window');

export default class App extends Component {
  componentDidMount() {
    Expo.Font.loadAsync({
      'Roboto-Medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
      Roboto_medium: require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      pickerData: null,
      notelp: '',
      popAbout: false,
      popMenu: false,
    };
  }

  changePhoneNumber = notelp => {
    this.setState({
      notelp,
    });
  };

  changeMessage = message => {
    this.setState({
      message,
    });
  };

  sendMessage = () => {
    const { message, notelp } = this.state;
    const dataMessage = encodeURI(message);
    const no = notelp.substr(1);

    Linking.openURL(`${whatsappApi}${no}/?text=${dataMessage}`);
  };

  openMenu = () => {
    this.setState({
      popMenu: !this.state.popMenu,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.darkWhite} barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.openMenu}>
            <Icon
              style={{ color: '#338a3e' }}
              name="dots-vertical"
              type={`MaterialCommunityIcons`}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image source={require(`../assets/logo.png`)} style={styles.logo} />
          <Card style={styles.cardStyle}>
            <View style={styles.formNumber}>
              <PhoneInput
                initialCountry={`id`}
                ref={ref => {
                  this.phone = ref;
                }}
                onChangePhoneNumber={this.changePhoneNumber}
                value={this.state.notelp}
              />
            </View>
          </Card>
          <Card style={styles.cardStyle}>
            <Form style={styles.formStyle}>
              <Label style={{ color: '#fff' }}>Alamat</Label>
              <Textarea
                rowSpan={5}
                value={this.state.message}
                onChangeText={this.changeMessage}
                placeholder="Write a message..."
              />
            </Form>
          </Card>

          <TouchableOpacity onPress={this.sendMessage}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[colors.yellow, colors.green]}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Send</Text>
            </LinearGradient>
          </TouchableOpacity>

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
        <Modal
          isVisible={this.state.popMenu}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}>
          <View style={styles.contentModal}>
            <Text style={styles.itemTitlePop}>Menu</Text>
            <View style={styles.btnWrapper}>
              <Button
                rounded
                style={styles.btnReport}
                onPress={() => {
                  this.setState({ popMenu: !this.state.popMenu });
                  Linking.openURL(urlReport);
                }}
                iconLeft>
                <Icon type={`MaterialIcons`} active name="report" />
                <Text>Kirim kritik / saran</Text>
              </Button>
              <Button
                rounded
                style={styles.btnAbout}
                onPress={() => {
                  this.setState({
                    popMenu: !this.state.popMenu,
                    popAbout: !this.state.popAbout,
                  });
                }}
                iconLeft>
                <Icon type={`MaterialIcons`} active name="info-outline" />
                <Text>Tentang Whatscut</Text>
              </Button>
              <Button
                rounded
                style={styles.btnClose}
                onPress={() =>
                  this.setState({
                    popMenu: !this.state.popMenu,
                  })
                }
                iconLeft>
                <Icon type={`MaterialIcons`} active name="close" />
                <Text>Tutup</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.popAbout}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}>
          <View style={styles.contentModal}>
            <Text style={styles.textTitle}>Tentang</Text>
            <Image source={require(`../assets/icon.png`)} style={styles.iconAbout} />
            <Text style={styles.textNameApp}>Whatscut</Text>
            <Text style={styles.textVersion}>Version {appVersion}</Text>
            <Text style={styles.textBrand}>1001 Digital Products</Text>
            <Button
              rounded
              style={styles.btnClose}
              onPress={() =>
                this.setState({
                  popAbout: !this.state.popAbout,
                })
              }
              iconLeft>
              <Icon type={`MaterialIcons`} active name="close" />
              <Text>Tutup</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    backgroundColor: colors.headerBackground,
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
    borderRadius: 10,
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
  buttonStyle: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 10,
    width: width - 80,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //MODAL STYLE
  contentModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemTitlePop: {
    fontSize: 22,
    marginBottom: 20,
    color: '#338a3e',
    fontWeight: 'bold',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnClose: {
    width: '100%',
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#338a3e',
  },
  btnReport: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#338a3e',
  },
  btnAbout: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#338a3e',
  },
  //MODAL ABOUT
  textTitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#338a3e',
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 140,
    resizeMode: 'stretch',
    marginBottom: 50,
  },
  iconAbout: {
    height: 110,
    width: 110,
    marginTop: 5,
    marginBottom: 5,
  },
  textNameApp: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: '#338a3e',
  },
  textVersion: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 10,
    color: '#798488',
  },
  textBrand: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#798488',
  },
});
