import {
  Component,
  OnInit,
} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {HeroService} from './../../services/hero.service.ts';

@Component({
  selector: 'hero-editor',
  templateUrl: require('./hero-editor.tpl.html'),
})
export class HeroEditorComponent implements OnInit {
  public hero: app.IHero;

  constructor(
    private heroService: HeroService,
    private routeParams: RouteParams
  ) {}

  public ngOnInit() {
    let heroId = this.routeParams.get('id');

    this.heroService.getHeroById(heroId)
      .then(data => {
        this.hero = data;
      })
      .catch(console.error.bind(console));
  }
}
