import {
  ageIsValid,
  emailValidation,
  lei,
  organisationsnummerIsValid,
} from './validations';

/* personal */
export const FIELD_PERSONAL_FIRST_NAME = 'FIELD_PERSONAL_FIRST_NAME';
export const FIELD_PERSONAL_LAST_NAME = 'FIELD_PERSONAL_LAST_NAME';
export const FIELD_PERSONAL_ADDRESS = 'FIELD_PERSONAL_ADDRESS';
export const FIELD_PERSONAL_CITY = 'FIELD_PERSONAL_CITY';
export const FIELD_PERSONAL_ZIP_CODE = 'FIELD_PERSONAL_ZIP_CODE';
export const FIELD_PERSONAL_COUNTRY = 'FIELD_PERSONAL_COUNTRY';
export const FIELD_PERSONAL_EMAIL = 'FIELD_PERSONAL_EMAIL';
export const FIELD_PERSONAL_PHONE_NUMBER = 'FIELD_PERSONAL_PHONE_NUMBER';

export const PERSONAL_FIELDS = [
  FIELD_PERSONAL_FIRST_NAME,
  FIELD_PERSONAL_LAST_NAME,
  FIELD_PERSONAL_ADDRESS,
  FIELD_PERSONAL_CITY,
  FIELD_PERSONAL_ZIP_CODE,
  FIELD_PERSONAL_COUNTRY,
  FIELD_PERSONAL_EMAIL,
  FIELD_PERSONAL_PHONE_NUMBER,
];

/* nationality */
export const FIELD_PERSONAL_BIRTH_DATE = 'FIELD_PERSONAL_BIRTH_DATE';
export const FIELD_PERSONAL_SSN = 'FIELD_PERSONAL_SSN';
export const FIELD_PERSONAL_CITIZENSHIP = 'FIELD_PERSONAL_CITIZENSHIP';
export const FIELD_PERSONAL_COUNTRY_OF_RESIDENCE = 'FIELD_PERSONAL_COUNTRY_OF_RESIDENCE';

export const NATIONALITY_FIELDS = [
  FIELD_PERSONAL_BIRTH_DATE,
  FIELD_PERSONAL_SSN,
  FIELD_PERSONAL_CITIZENSHIP,
  FIELD_PERSONAL_COUNTRY_OF_RESIDENCE,
];

/* company */
export const FIELD_COMPANY_NAME = 'FIELD_COMPANY_NAME';
export const FIELD_COMPANY_LEI_CODE = 'FIELD_COMPANY_LEI_CODE';
export const FIELD_COMPANY_ID = 'FIELD_COMPANY_ID';
export const FIELD_COMPANY_COUNTRY_OF_INCORPORATION = 'FIELD_COMPANY_COUNTRY_OF_INCORPORATION';
export const FIELD_COMPANY_STREET_ADDRESS = 'FIELD_COMPANY_STREET_ADDRESS';
export const FIELD_COMPANY_ZIP_CODE = 'FIELD_COMPANY_ZIP_CODE';
export const FIELD_COMPANY_CITY = 'FIELD_COMPANY_CITY';
export const FIELD_COMPANY_COUNTRY = 'FIELD_COMPANY_COUNTRY';

export const FIELD_COMPANY_CONTACT_FIRST_NAME = 'FIELD_COMPANY_CONTACT_FIRST_NAME';
export const FIELD_COMPANY_CONTACT_LAST_NAME = 'FIELD_COMPANY_CONTACT_LAST_NAME';
export const FIELD_COMPANY_CONTACT_EMAIL = 'FIELD_COMPANY_CONTACT_EMAIL';
export const FIELD_COMPANY_CONTACT_PHONE_NUMBER = 'FIELD_COMPANY_CONTACT_PHONE_NUMBER';

export const COMPANY_DETAILS_FIELDS = [
  FIELD_COMPANY_NAME,
  FIELD_COMPANY_LEI_CODE,
  FIELD_COMPANY_ID,
  FIELD_COMPANY_COUNTRY_OF_INCORPORATION,
  FIELD_COMPANY_STREET_ADDRESS,
  FIELD_COMPANY_ZIP_CODE,
  FIELD_COMPANY_CITY,
  FIELD_COMPANY_COUNTRY,
];

export const COMPANY_CONTACT_FIELDS = [
  FIELD_COMPANY_CONTACT_FIRST_NAME,
  FIELD_COMPANY_CONTACT_LAST_NAME,
  FIELD_COMPANY_CONTACT_EMAIL,
  FIELD_COMPANY_CONTACT_PHONE_NUMBER,
];

/* bankFields */

export const FIELDS = {
  /* personal */
  [FIELD_PERSONAL_FIRST_NAME]: {
    label: 'First name',
    isValid: (value) => value.length > 1,
  },
  [FIELD_PERSONAL_LAST_NAME]: {
    label: 'Last name',
    isValid: (value) => value.length > 1,
  },
  [FIELD_PERSONAL_ADDRESS]: {
    label: 'Street Address',
    isValid: (value) => value.length > 1,
  },
  [FIELD_PERSONAL_CITY]: {
    label: 'City',
    isValid: (value) => value.length > 1,
  },
  [FIELD_PERSONAL_ZIP_CODE]: {
    label: 'Zip Code',
    isValid: (value) => value.length > 1 && value.match(/^[\d\s-]+$/),
  },
  [FIELD_PERSONAL_EMAIL]: {
    label: 'Email address',
    isValid: emailValidation,
  },
  [FIELD_PERSONAL_PHONE_NUMBER]: {
    label: 'Phone number',
    isValid: (value) => value.length > 1 && value.match(/^\+?[\d\s]+$/),
  },
  /* nationality */
  [FIELD_PERSONAL_BIRTH_DATE]: {
    label: 'Birth Date',
    /* at least 10 years */
    isValid: ageIsValid,
  },
  [FIELD_PERSONAL_SSN]: {
    label: 'National ID Number',
    isValid: (value) =>
      // return personnummerValidation(value)
      value.length > 1,
  },
  [FIELD_PERSONAL_CITIZENSHIP]: {
    label: 'Citizenship',
    isValid: (value) => value.length > 1,
  },
  [FIELD_PERSONAL_COUNTRY_OF_RESIDENCE]: {
    label: 'Country of Residence',
    isValid: (value) => value.length > 1,
  },
  /*  */
  [FIELD_COMPANY_NAME]: {
    label: 'Company name',
  },
  [FIELD_COMPANY_LEI_CODE]: {
    label: 'Company LEI number',
    /* ex: 724500VKKSH9QOLTFR81 */
    isValid: (value) => {
      try {
        return lei.isValid(value);
      } catch (err) {
        return false;
      }
    },
  },
  [FIELD_COMPANY_ID]: {
    label: 'Company ID/Organisationsnummer (optional)',
    // ex: 556074-7569
    isValid: organisationsnummerIsValid,
  },
  [FIELD_COMPANY_COUNTRY_OF_INCORPORATION]: {
    label: 'Company country of incorporation',
    isValid: (value) => value.length > 1,
  },
  [FIELD_COMPANY_STREET_ADDRESS]: {
    label: 'Company street address',
  },
  [FIELD_COMPANY_ZIP_CODE]: {
    label: 'Company zip code',
  },
  [FIELD_COMPANY_CITY]: {
    label: 'Company city',
  },
  [FIELD_COMPANY_COUNTRY]: {
    label: 'Company country',
    isValid: (value) => value.length > 1,
  },
  [FIELD_COMPANY_CONTACT_FIRST_NAME]: {
    label: 'Company contact person first name',
    isValid: (value) => value.length > 1,
  },
  [FIELD_COMPANY_CONTACT_LAST_NAME]: {
    label: 'Company contact person last name',
    isValid: (value) => value.length > 1,
  },
  [FIELD_COMPANY_CONTACT_EMAIL]: {
    label: 'Company contact person email',
    isValid: emailValidation,
  },
  [FIELD_COMPANY_CONTACT_PHONE_NUMBER]: {
    label: 'Company contact person phone number',
    isValid: (value) => value.length > 1,
  },
};
