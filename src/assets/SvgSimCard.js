import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSimCard({fill = '#ffffff'}) {
  return (
    <Svg
      fill={fill}
      width="40px"
      height="40px"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M210.828 85.172l-56-56A3.998 3.998 0 00152 28H55.992a12.013 12.013 0 00-12 12v176a12.013 12.013 0 0012 12H200a12.013 12.013 0 0012-12V88a4 4 0 00-1.172-2.828zM204 216a4.004 4.004 0 01-4 4H55.992a4.004 4.004 0 01-4-4V40a4.004 4.004 0 014-4h94.35L204 89.657zM76 120v72a4 4 0 004 4h96a4 4 0 004-4v-72a4 4 0 00-4-4H80a4 4 0 00-4 4zm8 4h88v64h-24v-36a4 4 0 00-8 0v36h-24v-36a4 4 0 00-8 0v36H84z" />
    </Svg>
  );
}

export default SvgSimCard;
