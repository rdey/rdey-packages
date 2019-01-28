export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const initializeState = () => ({
  type: INITIALIZE_STATE,
});

export const FETCH_SESSION = 'FETCH_SESSION';
export const fetchSession = () => ({
  type: FETCH_SESSION,
});

export const SET_KYC_STATE = 'SET_KYC_STATE';
export const setKycState = (state) => ({
  type: SET_KYC_STATE,
  state,
});

export const KYC_CASE_URL_FETCH = 'KYC_CASE_URL_FETCH';
export const kycCaseUrlFetch = () => ({
  type: KYC_CASE_URL_FETCH,
});

export const KYC_CASE_URL_ERROR = 'KYC_CASE_URL_ERROR';
export const kycCaseUrlError = (error) => ({
  type: KYC_CASE_URL_ERROR,
  error,
});
