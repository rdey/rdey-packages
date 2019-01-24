import invariant from 'invariant';
import identity from 'lodash/identity';
import { createSelector } from 'reselect';
import { FIELDS } from '../constants/fields/form';
import { BENEFICIAL_OWNERS_FIELDS } from '../constants/fields/beneficialOwners';
import {
  KYC_TYPE_FUNNEL_MAP,
  getNextPageIdInFunnel,
  getFunnelPageById,
} from '../constants/funnels';
import { KYC_TYPE_COMPANY, KYC_TYPE_PERSON } from '../constants/kycTypes';
import makeMultiRowSelectors from './makeMultiRowSelectors';
import { AUTHORIZED_BY_COMPANY_FIELDS } from '../constants/fields/agents';
import { FREE_TEXT_PURPOSES } from '../constants/fields/freeTextPurposes';
import {
  CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY,
  CLIENT_FULFILLMENTS_ENGAGED_IN,
  CLIENT_FULFILLMENTS_EEA_COMPANY,
  CLIENT_FULFILLMENTS_FIELDS,
} from '../constants/fields/clientFulfillments';

export const makeSelectFormData = () => (state) =>
  Object.entries(state.formData).reduce((c, [key, value]) => {
    const { isValid, label } = FIELDS[key];

    return {
      ...c,
      [key]: {
        valid: isValid ? isValid(value) : true,
        label,
        value,
      },
    };
  }, {});

export const makeSelectAgreesToEverything = () => (state) =>
  state.agreesToEverything;

export const makeSelectTaxLiability = () => (state) => state.taxLiability;

export const makeSelectPep = () => (state) => state.pep;

export const makeSelectClientFulfillments = () => (state) =>
  state.clientFulfillments;

const {
  makeSelectRows: makeSelectBeneficialOwners,
  makeSelectRowsLength: makeSelectBeneficialOwnersLength,
  makeSelectCanAddMoreRows: makeSelectCanAddMoreBeneficialOwners,
  makeSelectHasNoRows: makeSelectHasNoBeneficialOwners,
  makeSelectRowsAreValid: makeSelectBeneficialOwnersAreValid,
} = makeMultiRowSelectors({
  stateKey: 'beneficialOwners',
  fieldsDefinition: BENEFICIAL_OWNERS_FIELDS,
  rowsAreValid: (rows, rowsLength) =>
    rowsLength === 0
    || Object.values(rows).every((fields) =>
      Object.values(fields).every(({ valid }) => valid)),
});

export {
  makeSelectBeneficialOwners,
  makeSelectBeneficialOwnersLength,
  makeSelectCanAddMoreBeneficialOwners,
  makeSelectHasNoBeneficialOwners,
  makeSelectBeneficialOwnersAreValid,
};

const {
  makeSelectRows: makeSelectAuthorizedByCompany,
  makeSelectRowsLength: makeSelectAuthorizedByCompanyLength,
  makeSelectCanAddMoreRows: makeSelectCanAddMoreAuthorizedByCompany,
  makeSelectHasNoRows: makeSelectHasNoAuthorizedByCompany,
  makeSelectRowsAreValid: makeSelectAuthorizedByCompanyAreValid,
} = makeMultiRowSelectors({
  stateKey: 'agents',
  fieldsDefinition: AUTHORIZED_BY_COMPANY_FIELDS,
  rowsAreValid: (rows, rowsLength) =>
    rowsLength > 0
    && Object.values(rows).every((fields) =>
      Object.entries(fields).every(([fieldId, { value }]) => {
        const { isValid } = AUTHORIZED_BY_COMPANY_FIELDS[fieldId];
        return isValid ? isValid(value) : true;
      })),
});

export {
  makeSelectAuthorizedByCompany,
  makeSelectAuthorizedByCompanyLength,
  makeSelectCanAddMoreAuthorizedByCompany,
  makeSelectHasNoAuthorizedByCompany,
  makeSelectAuthorizedByCompanyAreValid,
};

export const makeSelectPurposeAndNature = () => (state) =>
  state.purposeAndNature;

export const makeSelectFreeTextPurposes = () => (state) =>
  state.freeTextPurposes;

const validFreeText = (freeTextPurposes) =>
  Object.entries(freeTextPurposes).every(([purposeId, fields]) => {
    const { freeTextFields } = FREE_TEXT_PURPOSES[purposeId];
    return (
      Object.values(fields).some((value) => value === true)
      || freeTextFields.some(
        (freeTextField) => freeTextPurposes[purposeId][freeTextField].length > 0,
      )
    );
  });

export const makeSelectPurposeAndNatureIsValid = () => {
  const selectPurposeAndNature = makeSelectPurposeAndNature();
  const selectFreeTextPurposes = makeSelectFreeTextPurposes();
  return createSelector(
    [selectPurposeAndNature, selectFreeTextPurposes],
    (purposeAndNature, freeTextPurposes) =>
      Object.values(purposeAndNature).every((value) => value !== null)
      && validFreeText(freeTextPurposes),
  );
};

export const makeSelectKycType = () => (state) => state.kycType;

export const makeSelectNextPage = (funnelPageId, providedFunnel) => {
  invariant(funnelPageId, 'You must provide a funnel page id');

  const selectKycType = makeSelectKycType();
  return createSelector(
    [selectKycType],
    (kycType) => {
      invariant(
        [KYC_TYPE_COMPANY, KYC_TYPE_PERSON].includes(kycType),
        'non nil kyc type must be assigned in state inroder to get the next funnel page',
      );

      const funnel = providedFunnel || KYC_TYPE_FUNNEL_MAP[kycType];
      invariant(
        funnel,
        'Could not find funnel, something is wrong witht the kycType',
      );
      const nextFunnelPageId = getNextPageIdInFunnel(funnel, funnelPageId);

      const nextPage = getFunnelPageById(funnel, nextFunnelPageId);
      invariant(nextPage, 'Invalid nextPage');
      return nextPage;
    },
  );
};

export const makeSelectHasSelectedAClientFulfillment = () => {
  const selectClientFulfillments = makeSelectClientFulfillments();
  return createSelector(
    [selectClientFulfillments],
    (clientFulfillments) =>
      Object.keys(CLIENT_FULFILLMENTS_FIELDS)
        .map((key) => clientFulfillments[key])
        .some(identity),
  );
};

export const makeSelectShouldSkipUbo = () => {
  const selectClientFulfillments = makeSelectClientFulfillments();
  return createSelector(
    [selectClientFulfillments],
    (clientFulfillments) =>
      [
        CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY,
        CLIENT_FULFILLMENTS_ENGAGED_IN,
        CLIENT_FULFILLMENTS_EEA_COMPANY,
      ]
        .map((key) => clientFulfillments[key])
        .some(identity),
  );
};

export const makeSelectUboIsValid = () => {
  const selectShouldSkipUbo = makeSelectShouldSkipUbo();
  const selectBeneficialOwnersAreValid = makeSelectBeneficialOwnersAreValid();
  const selectHasSelectedAClientFulfillment = makeSelectHasSelectedAClientFulfillment();
  return createSelector(
    [
      selectShouldSkipUbo,
      selectBeneficialOwnersAreValid,
      selectHasSelectedAClientFulfillment,
    ],
    (shouldSkipUbo, beneficialOwnersAreValid, hasSelectedAClientFulfillment) =>
      hasSelectedAClientFulfillment
      && (shouldSkipUbo || beneficialOwnersAreValid),
  );
};

const selectSession = (state) => state.session;

export const makeSelectBearer = () =>
  createSelector(
    [selectSession],
    (session) => session.bearer,
  );

export const makeSelectToken = () =>
  createSelector(
    [selectSession],
    (session) => session.token,
  );

export const makeSelectKycLoading = () =>
  createSelector(
    [selectSession],
    (session) => session.loadingState || session.loadingSession,
  );

export const makeSelectKycError = () =>
  createSelector(
    [selectSession],
    (session) => session.error,
  );

export const selectHost = (state) => state.host;
