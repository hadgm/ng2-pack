import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginComponent} from './login/login.component.ts';
import {DashboardComponent} from './dashboard/dashboard.component.ts';
import { Session } from './shared/session.service.ts';

@Component({
  selector: 'app',
  templateUrl: require('./app.tpl.html'),
  styles: [require('./app.component.scss')],
  directives: [
    ROUTER_DIRECTIVES,
  ],
  providers: [
    HTTP_PROVIDERS,
    Session,
  ],
})
@Routes([
  {
    path: '/',
    component: DashboardComponent,
  },
  {
    path: '/login',
    component: LoginComponent,
  },
])
export class AppComponent {
  public title: string = 'Heroes';
}

