import { createMock } from 'ts-auto-mock';
import { TextSelection } from '../../models/ActivitySelectText.dto';
import {
  textSelection,
  deconstructText,
  findWhitespaces,
  Whitespaces,
  Piece,
} from './play-select-text.get-selection-utils';

describe('activity > components > select-text > get-selection-utils', () => {
  const TITLE = 'test';
  const MOCK_TEXT = `És quan dormo que hi veig clar
Foll d'una dolça metzina,
Amb perles a cada mà
Visc al cor d'una petxina,
Só la font del comellar
I el jaç de la salvatgina,
-O la lluna que s'afina
En morir carena enllà.
És quan dormo que hi veig clar
Foll d'una dolça metzina.`;

  it(`${TITLE} 1 should return a custom textSelection`, () => {
    const EXPECTED: TextSelection = {
      selected: 'quan dormo',
      start: 3,
      end: 12,
      startParent: 'activitySecondaryText-0',
      endParent: 'activitySecondaryText-0',
    };

    const MOCK_SELECTION: Selection = createMock<Selection>({
      anchorOffset: 0,
      focusOffset: 8,
      isCollapsed: false,
      type: 'Caret',
      rangeCount: 1,
      toString: () => 'quan dormo',
    });
    const RESULT: TextSelection = textSelection(MOCK_SELECTION, MOCK_TEXT);

    expect(RESULT).toEqual(EXPECTED);
  });
});
