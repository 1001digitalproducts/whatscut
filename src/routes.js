import { createStackNavigator } from 'react-navigation';
import HomeScreen from '@screens/Main';
import AboutScreen from '@screens/About';

const StackWithHeaderPreset = createStackNavigator(
  {
    Home: HomeScreen,
    About: AboutScreen,
  },
  {
    headerTransitionPreset: 'uikit',
  }
);

export default StackWithHeaderPreset;
