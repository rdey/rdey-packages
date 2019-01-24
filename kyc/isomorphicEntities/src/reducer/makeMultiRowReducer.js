const makeMultiRowReducer = ({
  remove,
  update,
  add,
  canAddMore = () => true,
  key,
  getDefaultFieldValues,
}) => ({
  [remove](state, { rowId: rowIdToRemove }) {
    return {
      ...state,
      [key]: Object.entries(state[key])
        .filter(([rowId]) => rowId !== rowIdToRemove)
        .reduce(
          (c, [rowId, fields]) => ({
            ...c,
            [rowId]: fields,
          }),
          {},
        ),
    };
  },
  [update](state, { rowId, fieldId, value }) {
    return {
      ...state,
      [key]: {
        ...state[key],
        [rowId]: {
          ...state[key][rowId],
          /* if value is undefined, assume it is boolean value that is toggled */
          [fieldId]: typeof value === 'undefined' ? !state[key][rowId][fieldId] : value,
        },
      },
    };
  },
  [add](state, { rowId }) {
    if (!canAddMore(state)) {
      return state;
    }
    return {
      ...state,
      [key]: {
        ...state[key],
        [rowId]: getDefaultFieldValues(),
      },
    };
  },
});

export default makeMultiRowReducer;
