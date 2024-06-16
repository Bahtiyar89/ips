import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function UpArrow(props) {
  return (
    <Svg
      fill="#ffffff"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.01 512.01"
      xmlSpace="preserve"
      {...props}>
      <Path d="M505.755 358.256L271.088 123.589c-8.341-8.341-21.824-8.341-30.165 0L6.256 358.256c-8.341 8.341-8.341 21.824 0 30.165s21.824 8.341 30.165 0l219.584-219.584 219.584 219.584a21.275 21.275 0 0015.083 6.251 21.275 21.275 0 0015.083-6.251c8.341-8.341 8.341-21.824 0-30.165z" />
    </Svg>
  );
}

export default UpArrow;
