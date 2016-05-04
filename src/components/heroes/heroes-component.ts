import {
  Component,
  OnInit,
} from '@angular/core';
import {HeroService} from './../../services/hero/hero-service.ts';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'heroes',
  templateUrl: require('./heroes.tpl.html'),
  styles: [require('./heroes.scss')],
  directives: [
    ROUTER_DIRECTIVES,
  ],
})
export class HeroesComponent implements OnInit {
  public selectedHero: Hero;
  public heroes: Array<Hero>;
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
