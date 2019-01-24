export { default as configureStore } from './src/reducer/configureStore';

export { KYC_TYPE_PERSON, KYC_TYPE_COMPANY } from './src/constants/kycTypes';

export {
  TAX_LIABILITY_UNSET,
  TAX_LIABILITY_TRUE,
  TAX_LIABILITY_FALSE,
} from './src/constants/fields/taxLiability';

export {
  ORIGIN_SAVINGS,
  ORIGIN_SALARY,
  ORIGIN_HERITAGE,
  ORIGIN_CAPITAL_GAIN_FROM_COMPANY_DIVESTMENT,
  ORIGIN_CAPITAL_GAIN_FROM_REAL_ESTATE,
  ORIGIN_INSURANCE_MONIES,
  ORIGIN_OTHER,
  PURPOSE_SAVINGS_OTHER_THAN_RETIREMENT,
  PURPOSE_SAVINGS_RETIREMENT,
  PURPOSE_SPECULATION,
  PURPOSE_INVESTMENTS_TO_MAXIMIZE_PORTFOLIO_DIVERSITY,
  PURPOSE_OTHER,
  FREE_TEXT_PURPOSES_PURPOSE_OF_USING_REDEYES_SERVICES,
  FREE_TEXT_PURPOSES_ORIGIN_OF_THE_FUNDS,
  FREE_TEXT_PURPOSES,
} from './src/constants/fields/freeTextPurposes';

export {
  AMOUNT_LABELS,
  HORIZON_LABELS,
  FREQUENCY_LABELS,
  PURPOSE_AND_NATURE_ENTIRE_VALUE_OF_YOUR_INVESTMENT_PORTFOLIO,
  PURPOSE_AND_NATURE_EXPECT_TO_INVEST_IN_FINANCIAL_INSTRUMENTS,
  PURPOSE_AND_NATURE_INVESTMENT_HORIZON,
  PURPOSE_AND_NATURE_INVESTMENT_FREQUENCY,
  PURPOSE_AND_NATURE_KEYS,
} from './src/constants/fields/purposeAndNature';

export {
  INITIALIZE_STATE,
  initializeState,
  FETCH_SESSION,
  fetchSession,
  SET_KYC_STATE,
  setKycState,
} from './src/reducer/actions';

export { default as rootEpic } from './src/epics/rootEpic';

export {
  default as reducer,
  makeDefaultBirthDate,
  initialState,
  UPDATE_FREE_TEXT_PURPOSES,
  updateFreeTextPurposes,
  UPDATE_TAX_LIABILITY,
  updateTaxLiability,
  TOGGLE_PEP_CHECK,
  togglePepCheck,
  TOGGLE_CLIENT_FULFILLMENTS_CHECK,
  toggleClientFulfillmentsCheck,
  UPDATE_FORM_FIELD,
  updateFormField,
  TOGGLE_AGREES_TO_EVERYTHING,
  toggleAgreesToEverything,
  UPDATE_PURPOSE_AND_NATURE,
  updatePurposeAndNature,
  SET_KYC_TYPE,
  setKycType,
  SESSION_ERROR,
  sessionError,
  STATE_ERROR,
  stateError,
  SET_BEARER,
  setBearer,
} from './src/reducer';

export {
  $cooldark0,
  $cooldark1,
  $dark0,
  $dark1,
  $borderColor,
  $borderThickColor,
  $cherry,
  $cherryLight,
  $cherryDim,
  $cherryLine,
  $white,
  $black,
  $whiteDim,
  $whiteUltraDim,
  $green,
  GLOBAL_MIN_WIDTH,
  GLOBAL_MAX_WIDTH,
  MOBILE_MIN_WIDTH,
  PHABLET_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  DESKTOP_MIN_WIDTH,
  LAPTOP_MIN_WIDTH,
  HD_MIN_WIDTH,
  FULL_HD_MIN_WIDTH,
  MOBILE_MQ,
  PHABLET_MQ,
  TABLET_MQ,
  DESKTOP_MQ,
  LAPTOP_MQ,
  HD_MQ,
  FULL_HD_MQ,
} from './src/atoms';
