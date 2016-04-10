import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './../../services/hero.service.ts';
import {HeroesComponent} from './../heroes/heroes.component.ts';
import {DashboardComponent} from './../dashboard/dashboard.component.ts';
import {HeroEditorComponent} from './../hero-editor/hero-editor.component.ts';
import {WikiComponent} from './../wiki/wiki.component.ts'
// http providers come to the party
import {HTTP_PROVIDERS} from 'angular2/http';

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
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true,
  },
  {
    path: '/hero/:id',
    name: 'HeroEditor',
    component: HeroEditorComponent,
  }
])
export class AppComponent {
  public title: string = 'Heroes';
}

