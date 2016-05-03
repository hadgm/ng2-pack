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
} from 'angular2/testing';
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from'angular2/platform/testing/browser';
import {provide} from 'angular2/core';
import {DirectiveResolver, ViewResolver} from 'angular2/compiler';
import {HeroService} from './../../services/hero/hero-service.ts';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteRegistry, ROUTER_PRIMARY_COMPONENT, Router} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {Location} from 'angular2/platform/common';
import {SpyLocation} from 'angular2/router/testing';
import {DashboardComponent} from './dashboard-component.ts';
import {AppComponent} from './../app/app-component.ts';

describe('Dashboard Component', () => {
  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
  let tcb: TestComponentBuilder;

  beforeEachProviders(() => [
    TestComponentBuilder,
    HTTP_PROVIDERS,
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
    return tcb.createAsync(DashboardComponent)
      .then(fixture => {
        fixture.detectChanges();
        let element = fixture.nativeElement;
        expect(element.querySelector('h3').innerText).toContain('Top heroes');
      });
  });
});
