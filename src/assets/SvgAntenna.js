import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgAntenna({fill = '#ffffff'}) {
  return (
    <Svg
      fill={fill}
      width="40px"
      height="40px"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M43.832 39.04c.75.866 2.063.866 2.953-.118 3.89-4.219 6.094-9.844 6.094-15.914s-2.203-11.695-6.094-15.914c-.89-.985-2.203-.985-2.953-.118-.75.844-.539 1.946.328 2.907 3.14 3.492 4.899 8.086 4.899 13.125S47.3 32.64 44.16 36.133c-.867.96-1.078 2.062-.328 2.906zm-31.664 0c.75-.845.516-1.946-.328-2.907C8.7 32.64 6.94 28.047 6.94 23.008c0-5.04 1.758-9.633 4.899-13.125.844-.961 1.078-2.063.328-2.906-.75-.868-2.063-.868-2.976.117-3.891 4.218-6.07 9.843-6.07 15.914 0 6.07 2.179 11.695 6.07 15.914.913.984 2.226.984 2.976.117zm7.031-6.68c.75-.844.422-1.9-.304-2.907-1.407-1.734-2.11-4.008-2.11-6.445 0-2.438.75-4.64 2.11-6.445.726-1.032 1.054-2.063.304-2.907-.773-.89-2.18-.914-3 .164a14.616 14.616 0 00-3.234 9.188c0 3.445 1.195 6.656 3.234 9.187.82 1.078 2.227 1.055 3 .164zm17.578 0c.797.89 2.18.913 3.024-.165 2.039-2.53 3.21-5.742 3.21-9.187 0-3.445-1.171-6.656-3.21-9.188-.844-1.078-2.227-1.054-3.024-.164-.75.844-.422 1.875.305 2.906 1.36 1.805 2.11 4.008 2.11 6.446 0 2.437-.704 4.71-2.11 6.445-.727 1.008-1.055 2.063-.305 2.906zm-8.789 17.53c1.125 0 1.805-.796 1.805-2.015V26.828a4.223 4.223 0 002.414-3.82c0-2.344-1.852-4.242-4.219-4.242-2.343 0-4.195 1.898-4.195 4.242 0 1.687.961 3.14 2.414 3.82v21.047c0 1.195.727 2.016 1.781 2.016z" />
    </Svg>
  );
}

export default SvgAntenna;
