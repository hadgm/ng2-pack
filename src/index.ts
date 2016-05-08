import './index.html';
import 'style!css!sass!./styles/index.scss';
// Observable default come with a few operator, import some manually
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// or import all
import 'rxjs/Rx';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {
  PLATFORM_DIRECTIVES,
  provide
} from '@angular/core';
import {AppComponent} from './components/app/app-component';
import {
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
} from '@angular/router';

bootstrap(AppComponent, [
  provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true}),
  ROUTER_PROVIDERS,
]);
