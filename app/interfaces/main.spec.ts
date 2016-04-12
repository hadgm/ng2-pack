/// <reference path="./main.ts" />

describe('app.IHero', () => {
  it('has name', () => {
    let hero: app.IHero = {_id: '1', name: 'Super Cat'};
    expect(hero.name).toEqual('Super Cat');
  });
  it('has id', () => {
    let hero: app.IHero = {_id: '1', name: 'Super Cat'};
    expect(hero._id).toEqual('1');
  });
});
