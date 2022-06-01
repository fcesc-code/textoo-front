import { ImproveBreaklinesPipe } from './improve-breaklines.pipe';
import { PREFIX, SUFIX } from './highlight-text.marks';

describe('activity-select-text > pipes > ImprovedBreaklinesPipe', () => {
  let pipe: ImproveBreaklinesPipe;
  const TITLE = 'test';

  beforeEach(() => {
    pipe = new ImproveBreaklinesPipe();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TITLE} 2 > should add <p> elements and remove <br> or \b elements`, () => {
    const MOCK_TEXT = `És quan dormo que hi veig clar
Foll d'una dolça metzina.`;
    const EXPECTED = `<p id="activitySecondaryText-0">És quan dormo que hi veig clar</p><p id="activitySecondaryText-1">Foll d'una dolça metzina.</p>`;
    const RESULT = pipe.transform(MOCK_TEXT);
    expect(RESULT).toBe(EXPECTED);
  });

  it(`${TITLE} 3 > if there is a <span> element, create new span tags to follow the pattern </span></p><p><span>`, () => {
    const MOCK_TEXT = `És quan dormo que ${PREFIX}hi veig clar
Foll${SUFIX} d'una dolça metzina.`;
    const EXPECTED = `<p id="activitySecondaryText-0">És quan dormo que ${PREFIX}hi veig clar${SUFIX}</p><p id="activitySecondaryText-1">${PREFIX}Foll${SUFIX} d'una dolça metzina.</p>`;
    const RESULT = pipe.transform(MOCK_TEXT);
    expect(RESULT).toBe(EXPECTED);
  });

  it(`${TITLE} 4 > if there is multiple <span> elements, create in the last one new span tags to follow the pattern </span></p><p><span>`, () => {
    const MOCK_TEXT = `És ${PREFIX}quan${SUFIX} dormo que ${PREFIX}hi veig clar
Foll${SUFIX} d'una dolça metzina.`;
    const EXPECTED = `<p id="activitySecondaryText-0">És ${PREFIX}quan${SUFIX} dormo que ${PREFIX}hi veig clar${SUFIX}</p><p id="activitySecondaryText-1">${PREFIX}Foll${SUFIX} d'una dolça metzina.</p>`;
    const RESULT = pipe.transform(MOCK_TEXT);
    expect(RESULT).toBe(EXPECTED);
  });

  it(`${TITLE} 5 > if there is no line break, just add an opening and a closing for the whole string.`, () => {
    const MOCK_TEXT = `És quan dormo que hi veig clar.`;
    const EXPECTED = `<p id="activitySecondaryText-0">És quan dormo que hi veig clar.</p>`;
    const RESULT = pipe.transform(MOCK_TEXT);
    expect(RESULT).toBe(EXPECTED);
  });
});
