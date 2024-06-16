import * as React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function GradientSvg(props) {
  const width = props.windowWidth;
  const height = props.windowHeight;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_201_1574)">
        <Rect width={width} height={height} rx={0} fill="#6E6CFD" />

        <G filter="url(#filter0_d_201_1574)" clipPath="url(#clip1_201_1574)">
          <G clipPath="url(#clip2_201_1574)">
            <Rect
              x={-467}
              y={-2}
              width={width}
              height={width}
              rx={150.167}
              fill="#6248FF"
            />
            <Path
              d="M739.478-403.786C700.026-656.81 552.866-779.93 342.13-925.422c-548.78-378.878-1540.41-19.416-1933.67 519.154-392.45 537.469-418.78 1149.967-49.2 1703.408 331.02 495.69 686.118 144.14 1241.668-71.82 516.467-200.76 765.835 464.77 1073.259 3.75C884.345 913.919 185.299 642.631 70.974 390.745-96.62 21.497 801.95-3.125 739.478-403.786z"
              fill="url(#paint0_linear_201_1574)"
              fillOpacity={0.45}
            />
            <Path
              d="M624.224-156.717c-34.695-222.517-164.113-330.794-349.441-458.744-482.616-333.198-1354.693-17.076-1700.533 456.562-345.14 472.669-368.29 1011.321-43.27 1498.039 291.1 435.92 603.393 126.76 1091.964-63.16 454.199-176.56 673.502 408.73 943.861 3.3C751.626 1002.12 136.86 763.539 36.318 542.022c-147.387-324.73 642.846-346.383 587.906-698.739z"
              fill="url(#paint1_linear_201_1574)"
              fillOpacity={0.31}
            />
          </G>
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_201_1574"
          x1={350.08}
          y1={-939.973}
          x2={198.14}
          y2={1057.25}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#92A8F7" />
          <Stop offset={1} stopColor="#6268FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_201_1574"
          x1={350.958}
          y1={-628.258}
          x2={148.153}
          y2={1128.17}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#92A8F7" />
          <Stop offset={1} stopColor="#6268FF" />
        </LinearGradient>

        <ClipPath id="clip1_201_1574">
          <Path fill="#000" d="M0 0H390V844H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default GradientSvg;
