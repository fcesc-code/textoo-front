const DEFAULT_OPTION_PLACEHOLDER =
  '<option value="" disabled selected hidden>...</option>';
const SELECT_CLASS =
  'border-b-2 border-solid border-teal-700 hover:bg-yellow-100';
const OPTION_CLASS = '';

export const ID_PREFIX = 'SEL-';

export const SELECT = {
  PREFIX: {
    OPEN_TAG: `<select class="${SELECT_CLASS}" id="${ID_PREFIX}`,
    CLOSE_TAG: `">${DEFAULT_OPTION_PLACEHOLDER}`,
  },
  SUFFIX: '</select>',
};

export const OPTION = {
  PREFIX: {
    OPEN_TAG: `<option class="${OPTION_CLASS}" value="`,
    CLOSE_TAG: '">',
  },
  SUFFIX: '</option>',
};

export const QUESTION = {
  PREFIX: '<em>(',
  SUFFIX: ')</em>',
};

export const PLACEHOLDER = {
  PREFIX: '<strong style="background-color:yellow">PREGUNTA N. ',
  SUFFIX: '</strong>',
};
