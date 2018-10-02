import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { responsiveWidth as wx, responsiveHeight as hx } from 'react-native-responsive-dimensions';
import { WHATSCUT_LOGO } from '@constants/assets';
import { appVersion } from '@constants/config';
import colors from '@constants/colors';

class About extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: colors.white,
        }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Image
            style={{ width: wx(30), height: hx(25), resizeMode: 'contain' }}
            source={WHATSCUT_LOGO}
          />
          <Text
            style={{
              color: colors.blackTertiary,
              fontFamily: 'Roboto-Medium',
              fontSize: 17,
              paddingVertical: 10,
              textAlign: 'center',
            }}>
            Version {appVersion}
          </Text>
        </View>
        <Text
          style={{
            color: colors.blackTertiary,
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            position: 'absolute',
            bottom: hx(5),
          }}>
          1001 Digital Products
        </Text>
      </View>
    );
  }
}

export default About;
