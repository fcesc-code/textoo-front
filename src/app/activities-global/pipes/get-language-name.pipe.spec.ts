import { GetLanguagePipe } from './get-language-name.pipe';
import { LANGUAGES } from 'src/app/shared/constants/globals';

describe('activities-global > pipes > AddOptionPipe', () => {
  const TITLE = 'test';
  let pipe: GetLanguagePipe;

  beforeEach(() => {
    pipe = new GetLanguagePipe();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TITLE} 2 > should return a valid long language name`, () => {
    for (let lang of LANGUAGES) {
      const result = pipe.transform(lang.short);
      expect(lang.long).toEqual(result);
    }
  });

  it(`${TITLE} 3 > should return the same input if a language is not found`, () => {
    const result = pipe.transform('not-a-language');
    expect(result).toEqual('not-a-language');
  });
});
