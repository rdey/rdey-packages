import styled from 'styled-components';

export const owl = `
& > * + * {
  margin: 1em 0;
}
`;

export const Header = styled.h1`
  text-align: center;
`;
export const SubHeader = styled.h1`
  text-align: center;
  font-size: 2.25em;
  margin-bottom: 0.75em;
`;

export const Paragraph = styled.p`
  line-height: 1.25;
  margin: 1em 0;
`;

export const Bold = styled.b``;
export const Highlight = styled.span`
  text-decoration: underline;
`;
export const NumericList = styled.ol`
  list-style-type: decimal;
  padding-left: 2em;
  margin-bottom: 0;
`;
export const AlphaList = styled.ol`
  list-style-type: lower-alpha;
  padding-left: 2em;
  margin-bottom: 0;
`;

export const UnorderedList = styled.ul`
  padding-left: 2em;
  margin-bottom: 0;
  & > * + * {
    margin: 0.5em 0;
  }
`;
export const SectionHeader = styled.h2`
  font-size: 2em;
  text-align: center;
  string-set: footer content();
`;
export const SubSectionHeader = styled.h3`
  ${({ italic }) => italic && 'font-style: italic'};
`;

export const Italic = styled.span`
  font-style: italic;
`;

const breakPage = `
  page-break-after: always;
`;

export const Wrapper = styled.div`
  ${owl};
  ${breakPage};
  padding: 1.5em;
  font-size: 12px;
`;

export const Section = styled.section`
  ${owl};
  ${breakPage};
`;

export const SubSection = styled.div`
  ${owl};
  page-break-inside: avoid;
`;

export const WhiteBox = styled.div`
  ${owl};
  border: 1px solid black;
  background: white;
  padding: 1em;
  margin: 1em;
  color: black;
`;
