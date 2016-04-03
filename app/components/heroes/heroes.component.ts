import {
  Component,
  OnInit,
} from 'angular2/core';
import {HeroEditorComponent} from '../hero-editor/hero-editor.component.ts';
import {HeroService} from './../../services/hero.service.ts';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'heroes',
  templateUrl: require('./heroes.tpl.html'),
  styles: [require('./heroes.scss')],
  directives: [
    HeroEditorComponent,
    ROUTER_DIRECTIVES,
  ],
})
export class HeroesComponent implements OnInit {
  public selectedHero: app.IHero;
  public heroes: Array<app.IHero>;

  constructor(
    private heroService: HeroService
  ) {}

  public ngOnInit() {
    this.getHeroes();
  }

  private getHeroes() {
    this.heroService.getHeroes()
      .then(data => this.heroes = data);
  }
}
