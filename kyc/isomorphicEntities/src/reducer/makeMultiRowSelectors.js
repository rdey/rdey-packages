import { createSelector } from 'reselect';

const makeMultiRowSelectors = ({ stateKey, fieldsDefinition, rowsAreValid = () => true }) => {
  const makeSelectRows = () => (state) =>
    Object.entries(state[stateKey]).reduce(
      (cRow, [rowId, fields]) => ({
        ...cRow,
        [rowId]: Object.entries(fields).reduce((cFields, [key, value]) => {
          const { isValid, label } = fieldsDefinition[key];

          return {
            ...cFields,
            [key]: {
              valid: isValid ? isValid(value) : true,
              label,
              value,
            },
          };
        }, {}),
      }),
      {},
    );

  const makeSelectRowsLength = () => {
    const selectRows = makeSelectRows();
    return createSelector(
      [selectRows],
      (rows) => Object.keys(rows).length,
    );
  };

  const makeSelectCanAddMoreRows = () => {
    const selectRowsLength = makeSelectRowsLength();
    return createSelector(
      [selectRowsLength],
      (length) => length < 3,
    );
  };

  const makeSelectHasNoRows = () => {
    const selectRowsLength = makeSelectRowsLength();
    return createSelector(
      [selectRowsLength],
      (length) => length === 0,
    );
  };

  const makeSelectRowsAreValid = () => {
    const selectRows = makeSelectRows();
    const selectRowsLength = makeSelectRowsLength();
    return createSelector(
      [selectRows, selectRowsLength],
      rowsAreValid,
    );
  };

  return {
    makeSelectRowsLength,
    makeSelectRows,
    makeSelectCanAddMoreRows,
    makeSelectHasNoRows,
    makeSelectRowsAreValid,
  };
};

export default makeMultiRowSelectors;
