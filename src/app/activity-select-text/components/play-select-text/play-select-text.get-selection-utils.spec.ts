import {
  findWhitespaces,
  deconstructText,
  textSelection,
} from './play-select-text.get-selection-utils';
import { MOCK_ACTIVITY_SELECT_TEXT } from 'mockdata/activity.mock';
import { TextSelection } from '../../models/ActivitySelectText.dto';

describe('activity-select-text > components > play-select-text > get-selection-utils', () => {
  const TITLE = 'test';

  it(`${TITLE} 1 > should findWhitespaces`, () => {
    const TEST = ' text with or without whitespaces  ';
    const EXPECTED = { leftWhitespaces: 1, rightWhitespaces: 2 };

    const RESULT = findWhitespaces(TEST);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 2 > should not findWhitespaces`, () => {
    const TEST = 'text with or without whitespaces';
    const EXPECTED = { leftWhitespaces: 0, rightWhitespaces: 0 };

    const RESULT = findWhitespaces(TEST);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should return one text piece`, () => {
    const PIECES: string[] = [
      'text ',
      '<p id="activitySecondaryText-1">',
      'with',
      '</p>',
      ' or without whitespaces',
    ];
    const TEST = PIECES.join('');
    const EXPECTED = [
      {
        value: 'with or without whitespaces',
        length: 27,
        start: 0,
        end: 26,
        startParentNumber: 0,
      },
    ];

    const RESULT = deconstructText(TEST);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 4 > should return multiple text pieces`, () => {
    const PIECES: string[] = [
      'text ',
      '<p id="activitySecondaryText-1">',
      'with',
      '</p>',
      ' or without ',
      '<p id="activitySecondaryText-1">',
      'whitespaces',
      '</p>',
    ];
    const TEST = PIECES.join('');
    const EXPECTED = [
      {
        value: 'with or without ',
        length: 16,
        start: 0,
        end: 15,
        startParentNumber: 0,
      },
      {
        value: 'whitespaces',
        length: 11,
        start: 17,
        end: 27,
        startParentNumber: 1,
      },
    ];

    const RESULT = deconstructText(TEST);
    expect(RESULT).toEqual(EXPECTED);
  });

  xit(`${TITLE} 5 > should return a text selection`, () => {
    const MOCK_NODE = {} as Node;
    const MOCK_SELECTION: Selection = {
      anchorOffset: 31,
      anchorNode: MOCK_NODE,
      focusOffset: 55,
      focusNode: MOCK_NODE,
      rangeCount: 1,
      isCollapsed: false,
      type: 'Range',
    } as Selection;
    const EXPECTED: TextSelection = {
      selected: `Foll d'una dolça metzina`,
      start: 0,
      end: 14,
      startParent: 'activitySecondaryText-1',
      endParent: 'activitySecondaryText-1',
    };
    const RESULT = textSelection(
      MOCK_SELECTION,
      MOCK_ACTIVITY_SELECT_TEXT.text
    );
    expect(RESULT).toEqual(EXPECTED);
  });
});
