/// <reference path="./interfaces/main.ts" />

import './index.html';
import 'style!css!sass!./styles/index.scss';

import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component';
bootstrap(AppComponent);
