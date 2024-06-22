import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgKey({fill = '#fff'}) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.321 10.685L4 19l2 2m1-5l2 2M20 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgKey;
