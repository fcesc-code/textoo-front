import { GetLanguagePipe } from './get-language-name.pipe';
import { LANGUAGES } from 'src/app/shared/constants/globals';

describe('AddOptionPipe', () => {
  let pipe: GetLanguagePipe;
  const TEST = 'test';

  beforeEach(() => {
    pipe = new GetLanguagePipe();
  });

  it(`${TEST} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TEST} 2 > should return a valid long language name`, () => {
    for (let lang of LANGUAGES) {
      const result = pipe.transform(lang.short);
      expect(lang.long).toEqual(result);
    }
  });
});
