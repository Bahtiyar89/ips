import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function UploadSvg(props) {
  return (
    <Svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.034 14.006a1 1 0 01-2 .006l2-.006zM9.719 6.724l1.289-1.297.026 8.585 2-.006-.027-8.586 1.297 1.29a1 1 0 101.41-1.42l-3.719-3.695L8.3 5.314l1.419 1.41z"
        fill="#ffffff"
      />
      <Path
        d="M8.3 5.314a1 1 0 101.419 1.41L8.3 5.314zM4 12a2 2 0 012-2 1 1 0 100-2 4 4 0 00-4 4v6a4 4 0 004 4h11a5 5 0 005-5v-5a4 4 0 00-4-4 1 1 0 100 2 2 2 0 012 2v5a3 3 0 01-3 3H6a2 2 0 01-2-2v-6z"
        fill="#ffffff"
      />
    </Svg>
  );
}

export default UploadSvg;
