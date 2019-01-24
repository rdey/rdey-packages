import has from 'lodash/has';

let dev = false;
try {
  dev = process.env.NODE_ENV !== 'production';
} catch (e) {
  // do nothing
}

const createReducer = function createReducer(initialState, handlers) {
  if (dev && handlers.undefined) {
    console.warn(
      "Reducer contains an 'undefined' action type. "
        + 'Have you misspelled a constant?',
    );
  }

  return function reducer(state = initialState, action) {
    if (has(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export default createReducer;
