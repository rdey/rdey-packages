import { emailValidation } from './validations';

export const AGENTS_ROW_FULL_NAME = 'AGENTS_ROW_FULL_NAME';
export const AGENTS_ROW_SSN = 'AGENTS_ROW_SSN';
export const AGENTS_ROW_EMAIL = 'AGENTS_ROW_EMAIL';

export const AUTHORIZED_BY_COMPANY_FIELDS = {
  [AGENTS_ROW_FULL_NAME]: {
    label: 'Full name',
    isValid: (value) => value.length > 1,
  },
  [AGENTS_ROW_SSN]: {
    label: 'Personal ID',
    isValid: (value) => value.length > 1,
  },
  [AGENTS_ROW_EMAIL]: {
    label: 'Email',
    isValid: emailValidation,
  },
};
