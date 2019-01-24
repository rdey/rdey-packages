import fromPairs from 'lodash/fromPairs';
import invariant from 'invariant';
import { KYC_TYPE_COMPANY, KYC_TYPE_PERSON } from './kycTypes';

export const PAGE_START = 'PAGE_START';
export const PAGE_TERMS = 'PAGE_TERMS';
export const PAGE_COMPANY_DETAILS = 'PAGE_COMPANY_DETAILS';
export const PAGE_COMPANY_CONTACT = 'PAGE_COMPANY_CONTACT';
export const PAGE_COMPANY_AGENTS = 'PAGE_COMPANY_AGENTS';
export const PAGE_TAX = 'PAGE_TAX';
export const PAGE_PURPOSE_AND_NATURE = 'PAGE_PURPOSE_AND_NATURE';
export const PAGE_PEP = 'PAGE_PEP';
export const PAGE_PERSON_PERSONAL = 'PAGE_PERSON_PERSONAL';
export const PAGE_PERSON_NATIONALITY = 'PAGE_PERSON_NATIONALITY';
export const PAGE_SIGN = 'PAGE_SIGN';
export const PAGE_UBO = 'PAGE_UBO';

const PAGES = {
  [PAGE_START]: {
    uri: '/start',
    id: PAGE_START,
    label: 'Introduction',
  },

  [PAGE_TERMS]: {
    uri: '/terms',
    id: PAGE_TERMS,
    label: 'Terms',
  },

  [PAGE_COMPANY_DETAILS]: {
    uri: '/company/details',
    id: PAGE_COMPANY_DETAILS,
    label: 'Details',
  },

  [PAGE_COMPANY_CONTACT]: {
    uri: '/company/contact',
    id: PAGE_COMPANY_CONTACT,
    label: 'Contact',
  },

  [PAGE_COMPANY_AGENTS]: {
    uri: '/company/agents',
    id: PAGE_COMPANY_AGENTS,
    label: 'Agents',
  },

  [PAGE_TAX]: {
    uri: '/taxLiability',
    id: PAGE_TAX,
    label: 'Tax liability',
  },

  [PAGE_PURPOSE_AND_NATURE]: {
    uri: '/purposeAndNature',
    id: PAGE_PURPOSE_AND_NATURE,
    label: 'Purpose',
  },

  [PAGE_PEP]: {
    uri: '/person/pep',
    id: PAGE_PEP,
    label: 'PEP',
  },

  [PAGE_PERSON_PERSONAL]: {
    uri: '/person/personal',
    id: PAGE_PERSON_PERSONAL,
    label: 'Personal info',
  },

  [PAGE_PERSON_NATIONALITY]: {
    uri: '/person/nationality',
    id: PAGE_PERSON_NATIONALITY,
    label: 'Citizenship',
  },

  [PAGE_SIGN]: {
    uri: '/sign',
    id: PAGE_SIGN,
    label: 'Sign',
  },

  [PAGE_UBO]: {
    uri: '/company/ubo',
    id: PAGE_UBO,
    label: 'UBO',
  },
};

const makeFunnel = (listOfPages) => ({
  pageIds: listOfPages,
  pagesDict: fromPairs(listOfPages.map((id) => [id, PAGES[id]])),
});

const COMPANY_FUNNEL_PAGES = [
  PAGE_START,
  PAGE_TERMS,
  PAGE_COMPANY_DETAILS,
  PAGE_COMPANY_CONTACT,
  PAGE_COMPANY_AGENTS,
  PAGE_TAX,
  PAGE_UBO,
  PAGE_PURPOSE_AND_NATURE,
  PAGE_SIGN,
];

const PERSON_FUNNEL_PAGES = [
  PAGE_START,
  PAGE_TERMS,
  PAGE_PERSON_PERSONAL,
  PAGE_PERSON_NATIONALITY,
  PAGE_TAX,
  PAGE_PEP,
  PAGE_PURPOSE_AND_NATURE,
  PAGE_SIGN,
];

export const COMPANY_FUNNEL = makeFunnel(COMPANY_FUNNEL_PAGES);
export const PERSON_FUNNEL = makeFunnel(PERSON_FUNNEL_PAGES);

export const KYC_TYPE_FUNNEL_MAP = {
  [KYC_TYPE_COMPANY]: COMPANY_FUNNEL,
  [KYC_TYPE_PERSON]: PERSON_FUNNEL,
};

export const getNextPageIdInFunnel = (funnel, currentPageId) => {
  invariant(
    funnel.pageIds && funnel.pagesDict,
    'funnel must be a funnel object',
  );
  const currentIndex = funnel.pageIds.indexOf(currentPageId);

  invariant(
    currentIndex > -1,
    'Invalid currentPageId. It must be included in the funnel',
  );

  invariant(
    currentIndex < funnel.pageIds.length - 1,
    'You cannot get the next page of the last page in a funnel',
  );

  const nextPageId = funnel.pageIds[currentIndex + 1];
  return nextPageId;
};

export const getFunnelPageById = (funnel, pageId) => {
  const id = funnel.pagesDict[pageId];
  invariant(id, 'pageId must be included in the funnel');
  return id;
};
