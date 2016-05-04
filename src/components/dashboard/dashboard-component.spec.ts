import {
  describe,
  it,
  expect,
  beforeEach,
  beforeEachProviders,
  TestComponentBuilder,
  inject,
  MockDirectiveResolver,
  MockViewResolver,
  setBaseTestProviders,
} from '@angular/testing';
import {
  TEST_BROWSER_STATIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
} from'@angular/platform-browser/testing';
import {provide} from '@angular/core';
import {
  DirectiveResolver,
  ViewResolver,
  COMPILER_PROVIDERS,
  XHR,
} from '@angular/compiler';
import {HeroService} from './../../services/hero/hero-service.ts';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteRegistry, ROUTER_PRIMARY_COMPONENT, Router} from '@angular/router-deprecated';
import {RootRouter} from '@angular/router-deprecated/src/router';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/testing';
import {DashboardComponent} from './dashboard-component.ts';
import {AppComponent} from './../app/app-component.ts';

describe('Dashboard Component', () => {
  setBaseTestProviders(TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, TEST_BROWSER_STATIC_APPLICATION_PROVIDERS);
  let tcb: TestComponentBuilder;

  beforeEachProviders(() => [
    TestComponentBuilder,
    HTTP_PROVIDERS,
    XHR,
    COMPILER_PROVIDERS,
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useClass: AppComponent}),
    provide(DirectiveResolver, {useClass: MockDirectiveResolver}),
    provide(ViewResolver, {useClass: MockViewResolver}),
    HeroService,
    AppComponent,
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb_) => {
    tcb = tcb_;
  }));

  it('should render the title', () => {

    let a =  tcb.createAsync(DashboardComponent)
    console.log(a);

    a.then(fixture => {
        console.log(fixture);

        fixture.detectChanges();
        let element = fixture.nativeElement;
        expect(element.querySelector('h3').innerText).toContain('Top heroes');
      });
  });
});
