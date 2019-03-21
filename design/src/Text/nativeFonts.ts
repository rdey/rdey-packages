export const nativeFonts = {
  primary: {
    100: {
      normal: {
        fileName: 'Inter-Thin-BETA.ttf',
        fontFamilyName: 'inter-thin-beta',
      },
      italic: {
        fileName: 'Inter-ThinItalic-BETA.ttf',
        fontFamilyName: 'inter-thin-italic-beta',
      },
    },
    200: {
      normal: {
        fileName: 'Inter-ExtraLight-BETA.ttf',
        fontFamilyName: 'inter-extra-light-beta',
      },
      italic: {
        fileName: 'Inter-ExtraLightItalic-BETA.ttf',
        fontFamilyName: 'inter-extra-light-italic-beta',
      },
    },
    300: {
      normal: {
        fileName: 'Inter-Light-BETA.ttf',
        fontFamilyName: 'inter-light-beta',
      },
      italic: {
        fileName: 'Inter-LightItalic-BETA.ttf',
        fontFamilyName: 'inter-light-italic-beta',
      },
    },
    400: {
      normal: {
        fileName: 'Inter-Regular.ttf',
        fontFamilyName: 'inter-regular',
      },
      italic: {
        fileName: 'Inter-Italic.ttf',
        fontFamilyName: 'inter-italic',
      },
    },
    500: {
      normal: {
        fileName: 'Inter-Medium.ttf',
        fontFamilyName: 'inter-medium',
      },
      italic: {
        fileName: 'Inter-MediumItalic.ttf',
        fontFamilyName: 'inter-medium-italic',
      },
    },
    600: {
      normal: {
        fileName: 'Inter-SemiBold.ttf',
        fontFamilyName: 'inter-semi-bold',
      },
      italic: {
        fileName: 'Inter-SemiBoldItalic.ttf',
        fontFamilyName: 'inter-semi-bold-italic',
      },
    },
    700: {
      normal: {
        fileName: 'Inter-Bold.ttf',
        fontFamilyName: 'inter-bold',
      },
      italic: {
        fileName: 'Inter-BoldItalic.ttf',
        fontFamilyName: 'inter-bold-italic',
      },
    },
    800: {
      normal: {
        fileName: 'Inter-ExtraBold.ttf',
        fontFamilyName: 'inter-extra-bold',
      },
      italic: {
        fileName: 'Inter-ExtraBoldItalic.ttf',
        fontFamilyName: 'inter-extra-bold-italic',
      },
    },
    900: {
      normal: {
        fileName: 'Inter-Black.ttf',
        fontFamilyName: 'inter-black',
      },
      italic: {
        fileName: 'Inter-BlackItalic.ttf',
        fontFamilyName: 'inter-black-italic',
      },
    },
  },
  secondary: {
    200: {
      normal: {
        fileName: 'Oswald-ExtraLight.ttf',
        fontFamilyName: 'oswald-extra-light',
      },
      italic: {
        fileName: 'Oswald-Extra-LightItalic.ttf',
        fontFamilyName: 'oswald-extra-light-italic',
      },
    },
    300: {
      normal: {
        fileName: 'Oswald-Light.ttf',
        fontFamilyName: 'oswald-light',
      },
      italic: {
        fileName: 'Oswald-LightItalic.ttf',
        fontFamilyName: 'oswald-light-italic',
      },
    },
    400: {
      normal: {
        fileName: 'Oswald-Regular.ttf',
        fontFamilyName: 'oswald-regular',
      },
      italic: {
        fileName: 'Oswald-RegularItalic.ttf',
        fontFamilyName: 'oswald-regular-italic',
      },
    },
    500: {
      normal: {
        fileName: 'Oswald-Medium.ttf',
        fontFamilyName: 'oswald-medium',
      },
      italic: {
        fileName: 'Oswald-MediumItalic.ttf',
        fontFamilyName: 'oswald-medium-italic',
      },
    },
    600: {
      normal: {
        fileName: 'Oswald-DemiBold.ttf',
        fontFamilyName: 'oswald-demi-bold',
      },
      italic: {
        fileName: 'Oswald-DemiBold.ttf',
        fontFamilyName: 'oswald-demi-bold',
      },
    },
    700: {
      normal: {
        fileName: 'Oswald-Bold.ttf',
        fontFamilyName: 'oswald-bold',
      },
      italic: {
        fileName: 'Oswald-BoldItalic.ttf',
        fontFamilyName: 'oswald-bold-italic',
      },
    },
    900: {
      normal: {
        fileName: 'Oswald-Heavy.ttf',
        fontFamilyName: 'oswald-heavy',
      },
      italic: {
        fileName: 'Oswald-HeavyItalic.ttf',
        fontFamilyName: 'oswald-heavy-italic',
      },
    },
  },
} as {[family: string]: {
  [weight: string]: {
    [style: string]: {
      fileName: string,
      fontFamilyName: string
    }
  }
}};

export const fontFileNames = Object.values(nativeFonts).reduce((a1, weights) => {
  return a1.concat(Object.values(weights).reduce((a2, fontStyles) => {
    const fontFileNames = Object.values(fontStyles).map(({ fontFamilyName }) => fontFamilyName);
    return a2.concat(fontFileNames)
  }, [] as string[]))
}, [] as string[]);
