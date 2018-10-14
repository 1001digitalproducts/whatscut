/** @flow **/
import { PixelRatio } from 'react-native';
export default function(x: number) {
  return PixelRatio.roundToNearestPixel(x);
}
