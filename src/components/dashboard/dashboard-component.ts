import {Component, OnInit} from '@angular/core';
import {HeroService} from './../../services/hero/hero-service.ts';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'dashboard',
  templateUrl: require('./dashboard.tpl.html'),
  styles: [require('./dashboard.scss')],
})
export class DashboardComponent implements OnInit {
  public topHeroes: Hero[];
  public title: string;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(
        data => {
          data = data.sort((h1, h2) => h2.score - h1.score);
          this.topHeroes = data.slice(0, 5);
        },

        error => console.log(error)
       );
  }

  public goToDetail(hero) {
    let link = ['HeroEditor', { id: hero._id }];
    this.router.navigate(link);
  }
}
