import {Injectable} from 'angular2/core';
import * as uuid from 'node-uuid';

@Injectable()
export class HeroService {
  private heroes: Array<app.IHero>;

  constructor() {
    const heroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma', 'Tornado'];

    const createHero = (name: string): app.IHero => ({
      _id: uuid.v4(),
      name,
      score: Math.round(Math.random() * 10),
    });

    console.log('instance');


    this.heroes = heroNames.map(createHero);
  }

  public getHeroes() {
    return new Promise<app.IHero[]>((resolve, reject) => {
      setTimeout(() => resolve(this.heroes), 300);
    });
  }

  public getHeroById(id) {
    return this.getHeroes()
      .then(data => data.filter(({_id}) => _id === id)[0]);
  }
}
