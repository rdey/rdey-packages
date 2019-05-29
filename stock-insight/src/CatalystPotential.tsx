/**
 * @class CatalystPotential
 */

import styled from 'styled-components';
import * as React from 'react';

export type Props = { text: string };




// const Wrapper = styled.div`
//   display: flex;
//   align-items: flex-end;
// `;
// const SvgWrapper = styled.div``;

// const Svg = styled.svg`
//   width: 80px;
//   height: 64px;
// `;

// const Line = styled.line``;

// const Layer = ({
//   outerWidth,
//   innerWidth,
//   stroke,
//   fill,
//   innerX = 0,
//   outerX = 0,
//   topLeftOffset = 0,
// }) => {
//   const outerSide = outerWidth / 2;
//   const outerOffset = outerSide / 2;
//   const outerY = 80 - outerWidth;

//   const innerSide = innerWidth / 2;
//   const innerOffset = innerSide / 2;
//   const innerY = 80 - innerWidth;

//   const polygon = `
//     ${outerOffset + outerX + topLeftOffset}, ${outerY}
//     ${outerX + outerWidth - outerOffset}, ${outerY}
//     ${outerWidth + outerX}, ${outerY + outerWidth / 2}
//     ${outerX + outerWidth - outerOffset}, ${outerY + outerWidth}

//     ${innerX + innerWidth - innerOffset}, ${innerY + innerWidth}
//     ${innerWidth + innerX}, ${innerY + innerWidth / 2}
//     ${innerX + innerWidth - innerOffset}, ${innerY}
//     ${innerOffset + innerX}, ${innerY}

//     ${outerOffset + outerX + topLeftOffset}, ${outerY}
//   `;
//   return <Polygon points={polygon} stroke={stroke} fill={fill} />;
// };

// const Label = styled.div`
//   ${primaryTextMixin({
//     color: 'secondary4',
//   })};
//   line-height: 1;
// `;

// const Impact = ({ short = false, mid = false, long = false, value }) => {
//   return (
//     <Wrapper>
//       <SvgWrapper>
//         <Svg viewBox="-1 -1 92 82" preserveAspectRatio="none">
//           {/* borders */}
//           <Layer
//             innerWidth={60}
//             outerWidth={80}
//             fill={long ? 'white' : 'transparent'}
//             stroke="#c69697"
//             outerX={10}
//             innerX={5}
//           />
//           <Layer
//             innerWidth={40}
//             outerWidth={60}
//             x={0}
//             fill={mid ? 'white' : 'transparent'}
//             stroke="#c69697"
//             outerX={5}
//             innerX={0}
//           />
//           <Hexagon
//             width={40}
//             y={40}
//             x={0}
//             fill={short ? 'white' : 'transparent'}
//             stroke="#c69697"
//             bottomLeftOffset={0}
//             bottomTopOffset={0}
//           />
//         </Svg>
//       </SvgWrapper>
//       <Label>{value}</Label>
//     </Wrapper>
//   );
// };


const CatalystPotential = (props: Props) => {
  const { text } = props;

  return null;
  // return <Impact>Example Component: {text}</Impact>;
};

export default CatalystPotential;
