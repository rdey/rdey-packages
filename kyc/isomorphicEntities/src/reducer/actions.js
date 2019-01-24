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
