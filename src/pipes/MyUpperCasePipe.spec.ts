import {MyUpperCasePipe} from './MyUpperCasePipe.ts';

describe('MyUpperCasePipe', () => {
  let pipe: MyUpperCasePipe;

  beforeEach(() => {
    pipe = new MyUpperCasePipe();
  });

  it('transform abc to ABC', () => {
    expect(pipe.transform('abc')).toEqual('ABC');
  });

  it('transforms "abc DEF" to "ABC DEF"', () => {
    expect(pipe.transform('abc def')).toEqual('ABC DEF');
  });

  it('leaves "ABC DEF" unchanged', () => {
    expect(pipe.transform('ABC DEF')).toEqual('ABC DEF');
  });

});
