import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {HeroService} from './../../services/hero/hero-service.ts';
import {LoginComponent} from './../login/login-component.ts';
import {DashboardComponent} from './../dashboard/dashboard-component.ts';

@Component({
  selector: 'app',
  templateUrl: require('./app.tpl.html'),
  styles: [require('./app.scss')],
  directives: [
    ROUTER_DIRECTIVES,
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
  },
])
export class AppComponent {
  public title: string = 'Heroes';
}

