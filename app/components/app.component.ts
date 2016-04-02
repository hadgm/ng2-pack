import {Component} from 'angular2/core';
import * as uuid from 'node-uuid';

let createHero = (name: string): app.IHero => {
  return {
    _id: uuid.v4(),
    name,
  };
};

const heroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma', 'Tornado']

@Component({
  selector: 'app',
  templateUrl: require('./app.tpl.html'),
  styles: [require('./app.scss')],
})
export class AppComponent {
  public title: string = 'Heroes';
  public heroes = heroNames.map(createHero);
  public selectedHero: app.IHero;

  public onSelect(hero: app.IHero) {
    this.selectedHero = hero;
  }
}
