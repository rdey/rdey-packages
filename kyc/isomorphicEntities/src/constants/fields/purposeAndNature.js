const AMOUNT_LESS_THAN_1_MSEK = 'AMOUNT_LESS_THAN_1_MSEK';
const AMOUNT_1_5_MSEK = 'AMOUNT_1_5_MSEK';
const AMOUNT_5_10_MSEK = 'AMOUNT_5_10_MSEK';
const AMOUNT_MORE_THAN_10_MSEK = 'AMOUNT_MORE_THAN_10_MSEK';

export const AMOUNT_LABELS = {
  [AMOUNT_LESS_THAN_1_MSEK]: '<1 MSEK',
  [AMOUNT_1_5_MSEK]: '1-5 MSEK',
  [AMOUNT_5_10_MSEK]: '5-10 MSEK',
  [AMOUNT_MORE_THAN_10_MSEK]: '>10 MSEK',
};

const HORIZON_LESS_THAN_A_MONTH = 'HORIZON_LESS_THAN_A_MONTH';
const HORIZON_1_6_MONTHS = 'HORIZON_1_6_MONTHS';
const HORIZON_6_12_MONTHS = 'HORIZON_6_12_MONTHS';
const HORIZON_1_2_YEARS = 'HORIZON_1_2_YEARS';
const HORIZON_MORE_THAN_2_YEARS = 'HORIZON_MORE_THAN_2_YEARS';

export const HORIZON_LABELS = {
  [HORIZON_LESS_THAN_A_MONTH]: 'Less than a month',
  [HORIZON_1_6_MONTHS]: '1 – 6 months',
  [HORIZON_6_12_MONTHS]: '6 – 12 months',
  [HORIZON_1_2_YEARS]: '1 – 2 years',
  [HORIZON_MORE_THAN_2_YEARS]: 'More than 2 years',
};

const FREQUENCY_SEVERAL_TIMES_EVERY_MONTH = 'FREQUENCY_SEVERAL_TIMES_EVERY_MONTH';
const FREQUENCY_1_2_TIMES_MONTH = 'FREQUENCY_1_2_TIMES_MONTH';
const FREQUENCY_LESS_THAN_MONTHLY = 'FREQUENCY_LESS_THAN_MONTHLY';
const FREQUENCY_SEMI_ANNUALLY = 'FREQUENCY_SEMI_ANNUALLY';
const FREQUENCY_ANNUALLY = 'FREQUENCY_ANNUALLY';

export const FREQUENCY_LABELS = {
  [FREQUENCY_SEVERAL_TIMES_EVERY_MONTH]: 'Several times every month',
  [FREQUENCY_1_2_TIMES_MONTH]: '1 – 2 times/month',
  [FREQUENCY_LESS_THAN_MONTHLY]: 'Less than monthly',
  [FREQUENCY_SEMI_ANNUALLY]: 'Semi-annually',
  [FREQUENCY_ANNUALLY]: 'Annually',
};

export const PURPOSE_AND_NATURE_ENTIRE_VALUE_OF_YOUR_INVESTMENT_PORTFOLIO = 'PURPOSE_AND_NATURE_ENTIRE_VALUE_OF_YOUR_INVESTMENT_PORTFOLIO';
export const PURPOSE_AND_NATURE_EXPECT_TO_INVEST_IN_FINANCIAL_INSTRUMENTS = 'PURPOSE_AND_NATURE_EXPECT_TO_INVEST_IN_FINANCIAL_INSTRUMENTS';
export const PURPOSE_AND_NATURE_INVESTMENT_HORIZON = 'PURPOSE_AND_NATURE_INVESTMENT_HORIZON';
export const PURPOSE_AND_NATURE_INVESTMENT_FREQUENCY = 'PURPOSE_AND_NATURE_INVESTMENT_FREQUENCY';

export const PURPOSE_AND_NATURE_KEYS = [
  PURPOSE_AND_NATURE_ENTIRE_VALUE_OF_YOUR_INVESTMENT_PORTFOLIO,
  PURPOSE_AND_NATURE_EXPECT_TO_INVEST_IN_FINANCIAL_INSTRUMENTS,
  PURPOSE_AND_NATURE_INVESTMENT_HORIZON,
  PURPOSE_AND_NATURE_INVESTMENT_FREQUENCY,
];
