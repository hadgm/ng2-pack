import {
  Component,
  OnInit,
} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {HeroService, Hero} from './../../services/hero';

const range = (from, to, step = 1) => {
  let arr = [];
  for (let i = from; i < to; i += step) {
    arr.push(i);
  }
  return arr;
};

@Component({
  selector: 'hero-editor',
  templateUrl: require('./hero-editor.tpl.html'),
})
export class HeroEditorComponent implements OnInit {
  public hero: Hero;
  public scoreRange = range(0, 11);
  public errorMessage;

  constructor(
    private heroService: HeroService,
    private routeParams: RouteParams
  ) {}

  public ngOnInit() {
    let heroId = this.routeParams.get('id');

    this.heroService.getHeroById(heroId)
      .subscribe(data => this.hero = data);
  }

  public onSave() {
    console.log('adsf');

    this.heroService.updateHero(this.hero)
      .subscribe(
        hero  => this.hero = hero,
        error =>  this.errorMessage = <any>error
      );
  }
}
