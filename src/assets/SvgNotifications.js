import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgNotifications(props) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 5.5a5 5 0 015 5v2.24a2 2 0 00.505 1.328l1.276 1.436c.86.967.173 2.496-1.121 2.496H6.34c-1.294 0-1.98-1.53-1.12-2.496l1.275-1.436A2 2 0 007 12.74V10.5a5 5 0 015-5zm0 0V3m-1 18h2"
        stroke="#94A1CB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgNotifications;
