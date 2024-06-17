import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgRefresh(props) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.062 13A8 8 0 0118.2 6.944M19.938 11A8 8 0 016 17.292M9 17H6v.292M18.2 4v2.944m0 0V7h-3M6 20v-2.708"
        stroke="#94A1CB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgRefresh;
