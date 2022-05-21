import { TextSelection } from '../../models/ActivitySelectText.dto';
import { ID_HIGHLIGHT } from '../../pipes/highlight-text.marks';
import { ImproveBreaklinesPipe } from '../../pipes/improve-breaklines.pipe';

export function getTextSelection(
  selection: Selection,
  baseText: string
): TextSelection {
  const stringSelection = selection?.toString() || '';
  const superText = new ImproveBreaklinesPipe().transform(baseText);

  const partition = new RegExp(`<p id=\"activitySecondaryText-[0-9]+\">`, '');
  const pieces = superText.split(partition);
  let count = 0;
  const cleanPieces = pieces
    .slice(1, pieces.length)
    .map((piece) => piece.replace('</p>', ''))
    .map((piece) => ({
      value: piece,
      length: piece.length,
      start: 0,
      end: 0,
      startParentNumber: 0,
    }));
  cleanPieces[0].end = cleanPieces[0].length - 1;
  for (let i = 1; i < cleanPieces.length; i++) {
    cleanPieces[i].start =
      cleanPieces[i - 1].start + cleanPieces[i - 1].length - 1 + 2;
    count = cleanPieces[i].start;
    cleanPieces[i].end = cleanPieces[i].start + cleanPieces[i].length - 1;
    cleanPieces[i].startParentNumber = i;
  }
  console.log('pieces >>> ', cleanPieces);
  const anchor = selection?.anchorOffset || 0;
  const focus = selection?.focusOffset || 0;
  // treats RTL selection as LTR selection
  let start = 0;
  let end = 0;
  let startParentOffset = 0;
  let endParentOffset = 0;
  let startParent = '';
  let endParent = '';
  let startParentNumber = 0;
  let endParentNumber = 0;
  let startHighlighted = false;
  let endHighlighted = false;

  if (startParentNumber === endParentNumber) {
    start = Math.min(anchor, focus);
    end = Math.max(anchor, focus);
    startHighlighted =
      selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
    endHighlighted = selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
    startParent =
      (startHighlighted
        ? selection?.anchorNode?.parentElement?.parentElement?.id
        : selection?.anchorNode?.parentElement?.id) || '';
    endParent =
      (endHighlighted
        ? selection?.focusNode?.parentElement?.parentElement?.id
        : selection?.focusNode?.parentElement?.id) || '';
    startParentNumber = Number(startParent?.split('-')[1]);
    endParentNumber = Number(endParent?.split('-')[1]);
    startParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === startParentNumber)
        ?.start || 0;
    endParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
        ?.start || 0;
  }
  if (startParentNumber < endParentNumber) {
    start = anchor;
    end = focus;
    startHighlighted =
      selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
    endHighlighted = selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
    startParent =
      (startHighlighted
        ? selection?.anchorNode?.parentElement?.parentElement?.id
        : selection?.anchorNode?.parentElement?.id) || '';
    endParent =
      (endHighlighted
        ? selection?.focusNode?.parentElement?.parentElement?.id
        : selection?.focusNode?.parentElement?.id) || '';
    startParentNumber = Number(startParent?.split('-')[1]);
    endParentNumber = Number(endParent?.split('-')[1]);
    startParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === startParentNumber)
        ?.start || 0;
    endParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
        ?.start || 0;
  }
  if (startParentNumber > endParentNumber) {
    start = focus;
    end = anchor;
    startHighlighted = selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
    endHighlighted = selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
    startParent =
      (startHighlighted
        ? selection?.focusNode?.parentElement?.parentElement?.id
        : selection?.focusNode?.parentElement?.id) || '';
    endParent =
      (endHighlighted
        ? selection?.anchorNode?.parentElement?.parentElement?.id
        : selection?.anchorNode?.parentElement?.id) || '';
    startParentNumber = Number(endParent?.split('-')[1]);
    endParentNumber = Number(startParent?.split('-')[1]);
    startParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
        ?.start || 0;
    endParentOffset =
      cleanPieces.find((piece) => piece.startParentNumber === startParentNumber)
        ?.start || 0;
  }

  const leftWhitespaces =
    stringSelection.length - stringSelection.trimStart().length;
  const rightWhitespaces =
    stringSelection.length - stringSelection.trimEnd().length;
  console.log(
    `whiteSpaces >>> l:${stringSelection.length}, cl:${
      stringSelection.trim().length
    }, lw:${leftWhitespaces}, rw:${rightWhitespaces}`
  );
  const calculatedStart = start + startParentOffset + leftWhitespaces;
  const calculatedEnd =
    calculatedStart +
    stringSelection.length -
    1 -
    rightWhitespaces -
    leftWhitespaces -
    (endParentNumber - startParentNumber);
  const result = {
    selected: stringSelection.trim(),
    start: calculatedStart,
    end: calculatedEnd,
    startParent: startParent,
    endParent: endParent,
  };

  console.log('getTextSelection >>> result: ', result);
  return result;
}
