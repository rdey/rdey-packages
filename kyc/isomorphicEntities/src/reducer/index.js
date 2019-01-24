import invariant from 'invariant';
import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import { DateTime } from 'luxon';
import queryString from 'query-string';
import uuid from 'uuid/v4';
import { AUTHORIZED_BY_COMPANY_FIELDS } from '../constants/fields/agents';
import {
  BENEFICIAL_OWNERS_FIELDS,
  BENEFICIAL_OWNERS_ROW_IS_PEP,
} from '../constants/fields/beneficialOwners';
import {
  CLIENT_FULFILLMENTS_FIELDS,
  CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE,
} from '../constants/fields/clientFulfillments';
import { FIELDS, FIELD_PERSONAL_BIRTH_DATE } from '../constants/fields/form';
import { FREE_TEXT_PURPOSES } from '../constants/fields/freeTextPurposes';
import { PEP_FIELDS, PEP_NONE_OF_THE_ABOVE } from '../constants/fields/pep';
import { PURPOSE_AND_NATURE_KEYS } from '../constants/fields/purposeAndNature';
import {
  TAX_LIABILITY_FALSE,
  TAX_LIABILITY_TRUE,
  TAX_LIABILITY_UNSET,
} from '../constants/fields/taxLiability';
import { KYC_TYPE_COMPANY, KYC_TYPE_PERSON } from '../constants/kycTypes';
import { SET_KYC_STATE } from './actions';
import createReducer from './createReducer';
import makeMultiRowActions from './makeMultiRowActions';
import makeMultiRowReducer from './makeMultiRowReducer';
import { makeSelectCanAddMoreBeneficialOwners } from './selectors';

export const makeDefaultBirthDate = () => DateTime.local().toISODate(); //= > '2017-04-20'

const defaultValues = (value, keys) =>
  keys.reduce(
    (curr, key) => ({
      ...curr,
      [key]: value,
    }),
    {},
  );

const freeTextFields = flatten(
  Object.values(FREE_TEXT_PURPOSES).map(({ freeTextFields: f }) => f),
);

export const initialState = (token, host) => ({
  host,
  kycType: KYC_TYPE_COMPANY,
  session: {
    token,
    bearer: false,
    loadingSession: true,
    loadingState: true,
    error: false,
  },
  formData: {
    ...defaultValues('', Object.keys(FIELDS)),
    [FIELD_PERSONAL_BIRTH_DATE]: makeDefaultBirthDate(),
  },
  agreesToEverything: false,
  taxLiability: TAX_LIABILITY_UNSET,
  pep: defaultValues(false, Object.keys(PEP_FIELDS)),
  clientFulfillments: defaultValues(
    false,
    Object.keys(CLIENT_FULFILLMENTS_FIELDS),
  ),
  beneficialOwners: {},
  agents: {},
  purposeAndNature: defaultValues(null, PURPOSE_AND_NATURE_KEYS),
  freeTextPurposes: fromPairs(
    Object.entries(FREE_TEXT_PURPOSES).map(([id, { keys }]) => [
      id,
      fromPairs(
        keys.map((fieldId) => [
          fieldId,
          freeTextFields.includes(fieldId) ? '' : false,
        ]),
      ),
    ]),
  ),
});

export const UPDATE_FREE_TEXT_PURPOSES = 'UPDATE_FREE_TEXT_PURPOSES';
export const updateFreeTextPurposes = (purposeId, fieldId, value) => {
  invariant(
    Object.keys(FREE_TEXT_PURPOSES).includes(purposeId),
    'purposeId must be in FREE_TEXT_PURPOSES',
  );
  invariant(
    flatten(Object.values(FREE_TEXT_PURPOSES).map(({ keys }) => keys)).includes(
      fieldId,
    ),
    'fieldId must be in FREE_TEXT_PURPOSES',
  );
  return {
    type: UPDATE_FREE_TEXT_PURPOSES,
    purposeId,
    fieldId,
    value,
  };
};

export const UPDATE_TAX_LIABILITY = 'UPDATE_TAX_LIABILITY';

export const updateTaxLiability = (value) => {
  if (
    ![TAX_LIABILITY_FALSE, TAX_LIABILITY_TRUE, TAX_LIABILITY_UNSET].includes(
      value,
    )
  ) {
    throw new Error('Invalid tax liability value');
  }
  return {
    type: UPDATE_TAX_LIABILITY,
    value,
  };
};

export const TOGGLE_PEP_CHECK = 'TOGGLE_PEP_CHECK';
export const togglePepCheck = (field) => {
  if (!Object.keys(PEP_FIELDS).includes(field)) {
    throw new Error('Invalid pep field');
  }
  return {
    type: TOGGLE_PEP_CHECK,
    field,
  };
};

export const TOGGLE_CLIENT_FULFILLMENTS_CHECK = 'TOGGLE_CLIENT_FULFILLMENTS_CHECK';
export const toggleClientFulfillmentsCheck = (field) => {
  if (!Object.keys(CLIENT_FULFILLMENTS_FIELDS).includes(field)) {
    throw new Error('Invalid client fulfillments field');
  }
  return {
    type: TOGGLE_CLIENT_FULFILLMENTS_CHECK,
    field,
  };
};

export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD';

export const updateFormField = ({ id, value }) => ({
  type: UPDATE_FORM_FIELD,
  id,
  value,
});

export const TOGGLE_AGREES_TO_EVERYTHING = 'TOGGLE_AGREES_TO_EVERYTHING';

export const toggleAgreesToEverything = () => ({
  type: TOGGLE_AGREES_TO_EVERYTHING,
});

const {
  addType: ADD_BENEFICIAL_OWNER,
  removeType: REMOVE_BENEFICIAL_OWNER,
  updateType: UPDATE_BENEFICIAL_OWNER_FIELD,
  addAction: addBeneficialOwner,
  removeAction: removeBeneficialOwner,
  updateAction: updateBeneficialOwnerField,
} = makeMultiRowActions('beneficial_owner');

export {
  addBeneficialOwner,
  removeBeneficialOwner,
  updateBeneficialOwnerField,
};
export {
  addAuthorizedByCompany,
  removeAuthorizedByCompany,
  updateAuthorizedByCompanyField,
};

const {
  addType: ADD_AUTHORIZED_BY_COMPANY,
  removeType: REMOVE_AUTHORIZED_BY_COMPANY,
  updateType: UPDATE_AUTHORIZED_BY_COMPANY_FIELD,
  addAction: addAuthorizedByCompany,
  removeAction: removeAuthorizedByCompany,
  updateAction: updateAuthorizedByCompanyField,
} = makeMultiRowActions('authorized_by_company');

export const UPDATE_PURPOSE_AND_NATURE = 'UPDATE_PURPOSE_AND_NATURE';
export const updatePurposeAndNature = (key, value) => {
  if (typeof key === 'undefined' || typeof value === 'undefined') {
    throw new Error('key and value must be provided');
  }
  if (!PURPOSE_AND_NATURE_KEYS.includes(key)) {
    throw new Error('Invalid key for the purpose and nature');
  }
  return {
    type: UPDATE_PURPOSE_AND_NATURE,
    key,
    value,
  };
};

export const SET_KYC_TYPE = 'SET_KYC_TYPE';
export const setKycType = (kycType) => {
  if (![KYC_TYPE_COMPANY, KYC_TYPE_PERSON].includes(kycType)) {
    throw new Error('Invalid KYC type');
  }
  return {
    type: SET_KYC_TYPE,
    kycType,
  };
};

export const SESSION_ERROR = 'SESSION_ERROR';
export const sessionError = (error) => ({
  type: SESSION_ERROR,
  error,
});

export const STATE_ERROR = 'STATE_ERROR';
export const stateError = (error) => ({
  type: STATE_ERROR,
  error,
});

export const SET_BEARER = 'SET_BEARER';
export const setBearer = (bearer) => ({
  type: SET_BEARER,
  bearer,
});

const { token: clientSideToken = uuid() } = queryString.parse(
  typeof window === 'undefined' ? '' : window.location.search,
);

export default createReducer(
  initialState(clientSideToken, 'https://kyc-api.redeye.se'),
  {
    [SET_BEARER](state, { bearer, token }) {
      return {
        ...state,
        session: {
          ...state.session,
          loadingSession: false,
          bearer,
          token,
        },
      };
    },
    [STATE_ERROR](state) {
      return {
        ...state,
        session: {
          ...state.session,
          error: true,
          loadingSession: false,
          loadingState: false,
        },
      };
    },
    [SESSION_ERROR](state) {
      return {
        ...state,
        session: {
          ...state.session,
          error: true,
          loadingSession: false,
          loadingState: false,
        },
      };
    },
    [SET_KYC_STATE](state, { state: newState }) {
      return {
        ...state,
        ...newState,
        session: {
          ...state.session,
          loadingState: false,
        },
      };
    },
    [UPDATE_FREE_TEXT_PURPOSES](state, { purposeId, fieldId, value }) {
      return {
        ...state,
        freeTextPurposes: {
          ...state.freeTextPurposes,
          [purposeId]: {
            ...state.freeTextPurposes[purposeId],
            [fieldId]: freeTextFields.includes(fieldId)
              ? value
              : !state.freeTextPurposes[purposeId][fieldId],
          },
        },
      };
    },
    [SET_KYC_TYPE](state, { kycType }) {
      return {
        ...state,
        kycType,
      };
    },
    [UPDATE_PURPOSE_AND_NATURE](state, { key, value }) {
      return {
        ...state,
        purposeAndNature: {
          ...state.purposeAndNature,
          [key]: value,
        },
      };
    },
    ...makeMultiRowReducer({
      remove: REMOVE_BENEFICIAL_OWNER,
      update: UPDATE_BENEFICIAL_OWNER_FIELD,
      add: ADD_BENEFICIAL_OWNER,
      canAddMore(state) {
        const selectCanAddMoreBeneficialOwners = makeSelectCanAddMoreBeneficialOwners();
        return selectCanAddMoreBeneficialOwners(state);
      },
      key: 'beneficialOwners',
      getDefaultFieldValues() {
        return {
          ...defaultValues('', Object.keys(BENEFICIAL_OWNERS_FIELDS)),
          [BENEFICIAL_OWNERS_ROW_IS_PEP]: false,
        };
      },
    }),
    ...makeMultiRowReducer({
      remove: REMOVE_AUTHORIZED_BY_COMPANY,
      update: UPDATE_AUTHORIZED_BY_COMPANY_FIELD,
      add: ADD_AUTHORIZED_BY_COMPANY,
      key: 'agents',
      getDefaultFieldValues() {
        return defaultValues('', Object.keys(AUTHORIZED_BY_COMPANY_FIELDS));
      },
    }),
    [TOGGLE_CLIENT_FULFILLMENTS_CHECK](state, { field }) {
      return {
        ...state,
        clientFulfillments:
          field === CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE
          && !state.clientFulfillments[field]
            ? {
              ...initialState.clientFulfillments,
              [CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE]: true,
            }
            : {
              ...state.clientFulfillments,
              [CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE]: false,
              [field]: !state.clientFulfillments[field],
            },
      };
    },
    [TOGGLE_PEP_CHECK](state, { field }) {
      return {
        ...state,
        pep:
          field === PEP_NONE_OF_THE_ABOVE && !state.pep[field]
            ? {
              ...initialState.pep,
              [PEP_NONE_OF_THE_ABOVE]: true,
            }
            : {
              ...state.pep,
              [PEP_NONE_OF_THE_ABOVE]: false,
              [field]: !state.pep[field],
            },
      };
    },
    [UPDATE_TAX_LIABILITY](state, { value }) {
      return {
        ...state,
        taxLiability: value,
      };
    },
    [UPDATE_FORM_FIELD](state, { id, value }) {
      return {
        ...state,
        formData: {
          ...state.formData,
          [id]: value,
        },
      };
    },
    [TOGGLE_AGREES_TO_EVERYTHING](state) {
      return {
        ...state,
        agreesToEverything: !state.agreesToEverything,
      };
    },
    // All other action types result in state being returned
  },
);
