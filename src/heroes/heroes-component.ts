import {
  Component,
  OnInit,
} from '@angular/core';
import {HeroService} from './hero-service.ts';

@Component({
  selector: 'heroes',
  templateUrl: require('./heroes.tpl.html'),
  styles: [require('./heroes.scss')],
  directives: [],
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
