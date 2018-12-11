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
  ${$hiddenTillFontsLoaded()};
`;
