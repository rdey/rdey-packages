import uuid from 'uuid/v4';
import snakeCase from 'lodash/snakeCase';

const makeActionType = (prefix, id) =>
  snakeCase(`${prefix}_${id}`).toUpperCase();

const makeMultiRowActions = (id) => {
  const addType = makeActionType('add', id);
  const addAction = () => ({
    type: addType,
    rowId: uuid(),
  });

  const removeType = makeActionType('remove', id);
  const removeAction = (rowId) => ({
    type: removeType,
    rowId,
  });

  const updateType = makeActionType('update', id);
  const updateAction = (rowId, fieldId, value) => ({
    type: updateType,
    rowId,
    fieldId,
    value,
  });

  return {
    addType,
    addAction,
    removeType,
    removeAction,
    updateType,
    updateAction,
  };
};

export default makeMultiRowActions;
