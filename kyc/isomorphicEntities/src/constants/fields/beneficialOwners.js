export const BENEFICIAL_OWNERS_ROW_FULL_NAME = 'BENEFICIAL_OWNERS_ROW_FULL_NAME';
export const BENEFICIAL_OWNERS_ROW_BIRTH_DATE = 'BENEFICIAL_OWNERS_ROW_BIRTH_DATE';
export const BENEFICIAL_OWNERS_ROW_NATIONALITY = 'BENEFICIAL_OWNERS_ROW_NATIONALITY';
export const BENEFICIAL_OWNERS_ROW_ADDRESS = 'BENEFICIAL_OWNERS_ROW_ADDRESS';
export const BENEFICIAL_OWNERS_ROW_OWNERSHIP = 'BENEFICIAL_OWNERS_ROW_OWNERSHIP';
export const BENEFICIAL_OWNERS_ROW_VOTING_RIGHT = 'BENEFICIAL_OWNERS_ROW_VOTING_RIGHT';
export const BENEFICIAL_OWNERS_ROW_IS_PEP = 'BENEFICIAL_OWNERS_ROW_IS_PEP';

export const BENEFICIAL_OWNERS_FIELDS = {
  [BENEFICIAL_OWNERS_ROW_FULL_NAME]: {
    label: 'Full name',
    isValid: (value) => value.length > 1,
  },
  [BENEFICIAL_OWNERS_ROW_BIRTH_DATE]: {
    label: 'National ID number or birth date',
    isValid: (value) => value.length > 1,
  },
  [BENEFICIAL_OWNERS_ROW_OWNERSHIP]: {
    label: 'Ownership in per cent (%)',
    isValid: (value) => value.length > 1,
  },
  [BENEFICIAL_OWNERS_ROW_VOTING_RIGHT]: {
    label: 'Voting right in per cent (%)',
    isValid: (value) => value.length > 1,
  },
  [BENEFICIAL_OWNERS_ROW_IS_PEP]: {
    label: 'Is this a PEP?',
    isValid: (value) => value === true || value === false,
  },
};
