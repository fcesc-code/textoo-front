import { TextSelection } from '../../models/ActivitySelectText.dto';
import { ID_HIGHLIGHT } from '../../pipes/highlight-text.marks';
import { ImproveBreaklinesPipe } from '../../pipes/improve-breaklines.pipe';

export function textSelection(
  selection: Selection,
  baseText: string
): TextSelection {
  const stringSelection = selection?.toString() || '';
  const superText = new ImproveBreaklinesPipe().transform(baseText);
  const cleanPieces = deconstructText(superText);
  let results: CustomSelection = buildCustomSelection(selection, cleanPieces);

  const { leftWhitespaces, rightWhitespaces } =
    findWhitespaces(stringSelection);

  const calculatedStart =
    results.start + results.startParentOffset + leftWhitespaces;
  const calculatedEnd =
    calculatedStart +
    stringSelection.length -
    1 -
    rightWhitespaces -
    leftWhitespaces -
    (results.endParentNumber - results.startParentNumber);
  return {
    selected: stringSelection.trim(),
    start: calculatedStart,
    end: calculatedEnd,
    startParent: results.startParent,
    endParent: results.endParent,
  };
}

export interface CustomSelection {
  start: number;
  end: number;
  startParent: string;
  endParent: string;
  startParentNumber: number;
  endParentNumber: number;
  startParentOffset: number;
  endParentOffset: number;
}

export function buildCustomSelection(
  selection: Selection,
  cleanPieces: Piece[]
): CustomSelection {
  const result: CustomSelection = {
    start: 0,
    end: 0,
    startParentOffset: 0,
    endParentOffset: 0,
    startParent: '',
    endParent: '',
    startParentNumber: 0,
    endParentNumber: 0,
  };

  const anchor = selection?.anchorOffset || 0;
  const anchorHighlighted =
    selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
  const anchorSuperParentId =
    selection?.anchorNode?.parentElement?.parentElement?.id;
  const anchorParentId = selection?.anchorNode?.parentElement?.id;
  const anchorRightParent = anchorHighlighted
    ? anchorSuperParentId
    : anchorParentId;
  const anchorParent = anchorRightParent || '';
  const anchorParentNumber = Number(anchorParent?.split('-')[1]);
  const anchorParentOffset =
    cleanPieces.find((piece) => piece.startParentNumber === anchorParentNumber)
      ?.start || 0;

  const anchorExp = new RegExp(
    selection?.anchorNode?.parentElement?.innerText || '',
    'g'
  );
  const anchorSuperParentString =
    selection?.anchorNode?.parentElement?.parentElement?.innerText || '';
  const anchorParentMatches = Array.from(
    anchorSuperParentString.matchAll(anchorExp)
  );
  const anchorHighlightedOffset = anchorHighlighted
    ? anchorParentMatches[0]?.index || 0
    : 0; // compte, no funciona si hi ha parents iguals al superparent, pot fallar

  const focus = selection?.focusOffset || 0;
  const focusHighlighted =
    selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
  const focusSuperParentId =
    selection?.focusNode?.parentElement?.parentElement?.id;
  const focusParentId = selection?.focusNode?.parentElement?.id;
  const focusRightParent = focusHighlighted
    ? focusSuperParentId
    : focusParentId;
  const focusParent = focusRightParent || '';
  const focusParentNumber = Number(focusParent?.split('-')[1]);
  const focusParentOffset =
    cleanPieces.find((piece) => piece.startParentNumber === focusParentNumber)
      ?.start || 0;

  const focusExp = new RegExp(
    selection?.focusNode?.parentElement?.innerText || '',
    'g'
  );
  const focusSuperParentString =
    selection?.focusNode?.parentElement?.parentElement?.innerText || '';
  const focusParentMatches = Array.from(
    focusSuperParentString.matchAll(focusExp)
  );
  const focusHighlightedOffset = focusHighlighted
    ? focusParentMatches[0]?.index || 0
    : 0;

  const CONDITIONS = {
    sameParentLTR: anchorParentNumber === focusParentNumber && anchor < focus,
    sameParentRTL: anchorParentNumber === focusParentNumber && anchor > focus,
    differentParentsLTR: anchorParentNumber < focusParentNumber,
    differentParentsRTL: anchorParentNumber > focusParentNumber,
  };

  if (CONDITIONS.sameParentLTR || CONDITIONS.differentParentsLTR) {
    result.start = anchor;
    result.end = focus;
    result.startParent = anchorParent;
    result.endParent = focusParent;
    result.startParentNumber = anchorParentNumber;
    result.endParentNumber = focusParentNumber;
    result.startParentOffset = anchorParentOffset + anchorHighlightedOffset;
    result.endParentOffset = focusParentOffset + anchorHighlightedOffset;
  }
  if (CONDITIONS.sameParentRTL || CONDITIONS.differentParentsRTL) {
    result.start = focus;
    result.end = anchor;
    result.startParent = focusParent;
    result.endParent = anchorParent;
    result.startParentNumber = focusParentNumber;
    result.endParentNumber = anchorParentNumber;
    result.startParentOffset = focusParentOffset + focusHighlightedOffset;
    result.endParentOffset = anchorParentOffset + focusHighlightedOffset;
  }

  return result;
}

export interface Piece {
  value: string;
  start: number;
  end: number;
  length: number;
  startParentNumber: number;
}

export function deconstructText(text: string): Piece[] {
  const partition = /<p id=\"activitySecondaryText-\d+\">/;
  const pieces = text.split(partition);
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
  return cleanPieces;
}

export interface Whitespaces {
  leftWhitespaces: number;
  rightWhitespaces: number;
}

export function findWhitespaces(text: string): Whitespaces {
  const leftWhitespaces = text.length - text.trimStart().length;
  const rightWhitespaces = text.length - text.trimEnd().length;
  return { leftWhitespaces, rightWhitespaces };
}
