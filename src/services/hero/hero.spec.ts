import * as hero from './interface.ts';

describe('hero.IHero', () => {
  it('has name', () => {
    let hero: hero.Hero = {_id: '1', name: 'Super Cat'};
    expect(hero.name).toEqual('Super Cat');
  });
  it('has id', () => {
    let hero: hero.Hero = {_id: '1', name: 'Super Cat'};
    expect(hero._id).toEqual('1');
  });
});
