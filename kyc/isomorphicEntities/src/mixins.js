import {
  $cooldark0, $white, $cooldark1, $green, $cherryDim,
} from './atoms';

export const $hiddenTillFontsLoaded = () => `
  visibiliy: hidden;
  .fontsLoaded & {
    visibility: visible;
  }
`;

export const $oswald300 = () => `
  font-family: Oswald;
  font-weight: 300;
  ${$hiddenTillFontsLoaded()};
`;

export const $roboto400 = () => `
  font-family: Roboto;
  font-weight: 400;
  ${$hiddenTillFontsLoaded()};
`;

export const $roboto500 = () => `
  font-family: Roboto;
  font-weight: 500;
  letter-spacing: 0.5px;
  ${$hiddenTillFontsLoaded()};
`;

export const $inputStyle = ({ shouldDisplayValidation, valid }) => `
  border-bottom: 1px solid transparent;
  background-color: ${$cooldark0};

  border: 0;
  border-bottom: 1px solid transparent;

  ${$roboto400};

  color: ${$white};

  padding: 0 1em;
  height: 3em;

  outline: none;

  :focus {
    background-color: ${$cooldark1};
  }

  border-bottom-color: ${(() => {
    if (shouldDisplayValidation && valid) {
      return $green;
    }
    if (shouldDisplayValidation && !valid) {
      return $cherryDim;
    }
    return 'transparent';
  })()};
  width: 100%;
`;

export const lobotomized = () => `
  & > * + * {
    margin: 2.5em 0;
  }
`;
export const CONTAINER_WIDTH = 920;
export const container = () => `
  max-width: ${CONTAINER_WIDTH}px;
  margin: auto;
  padding: 2.5em 2em 4em 2em;
`;
