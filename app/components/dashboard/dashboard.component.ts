import {Component, OnInit} from 'angular2/core';
import {HeroService} from './../../services/hero.service.ts';
import {Router} from 'angular2/router';

@Component({
  selector: 'dashboard',
  templateUrl: require('./dashboard.tpl.html'),
  styles: [require('./dashboard.scss')],
})
export class DashboardComponent implements OnInit {
  public topHeroes: app.IHero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.heroService.getHeroes()
      .then(data => {
        data = data.sort((h1, h2) => h1.score - h2.score);
        this.topHeroes = data.slice(0, 5);
      });
  }

  public goToDetail(hero) {
    let link = ['HeroEditor', { id: hero._id }];
    this.router.navigate(link);
  }
}
