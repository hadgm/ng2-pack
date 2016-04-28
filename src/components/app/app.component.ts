import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {HeroService} from './../../services/hero';

import {DashboardComponent} from './../dashboard';
import {WikiComponent} from './../wiki/wiki.component.ts';
import {LoginComponent} from './../login';

@Component({
  selector: 'app',
  templateUrl: require('./app.tpl.html'),
  styles: [require('./app.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    WikiComponent,
  ],
  providers: [
    HeroService,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
  ],
})
@RouteConfig([
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  }
])
export class AppComponent {
  public title: string = 'Heroes';
}

