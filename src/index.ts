import './index.html';
import 'style!css!sass!./styles/index.scss';

// Observable default come with a few operator, import some manually
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// or import all
import 'rxjs/Rx';

import {bootstrapStatic} from '@angular/platform-browser';
import {AppComponent} from './components/app/app-component';
bootstrapStatic(AppComponent, []);
