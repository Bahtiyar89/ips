import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgMessagesLittle(props) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      data-name="24x24/On Light/Messages"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path fill="none" d="M0 0H24V24H0z" />
      <Path
        d="M6.485 18.519a9.891 9.891 0 01-4.876.981c-.285 0-.584-.006-.887-.018a.739.739 0 01-.65-.432.738.738 0 01.085-.775 11.192 11.192 0 002.072-3.787 9.751 9.751 0 118.522 5.012 9.661 9.661 0 01-4.266-.981zM6.808 17a8.247 8.247 0 10-3.139-3.015.75.75 0 01.092.535A10.189 10.189 0 012.2 17.99a7.2 7.2 0 003.816-.947.745.745 0 01.431-.136.756.756 0 01.361.093zm-.057-4.5a.75.75 0 010-1.5h7a.75.75 0 010 1.5zm0-4a.75.75 0 010-1.5h5a.75.75 0 110 1.5z"
        transform="translate(1.249 2.25)"
        fill="#94A1CB"
      />
    </Svg>
  );
}

export default SvgMessagesLittle;
