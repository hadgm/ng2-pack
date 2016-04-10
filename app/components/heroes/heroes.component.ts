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
  public errorMessage;

  constructor(
    private heroService: HeroService
  ) {}

  public ngOnInit() {
    this.getHeroes();
  }

  private getHeroes() {
    this.heroService.getHeroes()
      .subscribe(
        heroes => {
          this.heroes = heroes;
        },
        error => this.errorMessage = <any>error
      );
  }
}
