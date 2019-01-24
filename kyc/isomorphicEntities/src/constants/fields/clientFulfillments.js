/* CLIENT_FULFILLMENTS */

export const CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY = 'CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY';
export const CLIENT_FULFILLMENTS_ENGAGED_IN = 'CLIENT_FULFILLMENTS_ENGAGED_IN';
export const CLIENT_FULFILLMENTS_EEA_COMPANY = 'CLIENT_FULFILLMENTS_EEA_COMPANY';
export const CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE = 'CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE';

export const CLIENT_FULFILLMENTS_FIELDS = {
  [CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY]: {
    label: 'The client is a swedish authority',
  },
  [CLIENT_FULFILLMENTS_ENGAGED_IN]: {
    label:
      'The client is engaged in Swedish authority, banking or financial businesses, life assurance businesses, securities business, activities that require a notification or application to the Swedish FSA under Obligation to Notify Certain Financial Operations Act(1996:1006) or the Deposit Taking Operations Act(2004:299), insurance mediation, or mutual fund activities,',
  },
  [CLIENT_FULFILLMENTS_EEA_COMPANY]: {
    label:
      'The Client is a company within the EEA whose transferable securities have been admitted to trading on a regulated market.',
  },
  [CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE]: {
    label: 'None of the above',
  },
};
