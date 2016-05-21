import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UserFormComponent } from '../user/user-form.component.ts';

@Component({
  selector: 'dashboard',
  templateUrl: require('./dashboard.tpl.html'),
  styles: [require('./dashboard.component.scss')],
  directives: [
    UserFormComponent,
  ],
})
export class DashboardComponent implements OnInit {
  public title: string = 'Dashboard';

  constructor(
    private router: Router
  ) {}

  public ngOnInit() {
    // noop
  }

  public goToDetail(hero) {
    let link = ['/', { id: hero._id }];
    this.router.navigate(link);
  }
}
