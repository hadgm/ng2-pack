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
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
} from'@angular/platform-browser-dynamic/testing';
import {provide} from '@angular/core';
import {
  DirectiveResolver,
  ViewResolver,
} from '@angular/compiler';
import {LoginComponent} from './login.component.ts';

describe('Login Component', () => {
  setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
  let tcb: TestComponentBuilder;

  beforeEachProviders(() => [
    TestComponentBuilder,
    provide(DirectiveResolver, {useClass: MockDirectiveResolver}),
    provide(ViewResolver, {useClass: MockViewResolver}),
    LoginComponent,
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb_) => {
    tcb = tcb_;
  }));

  it('should render form', (done) => {
    tcb.createAsync(LoginComponent)
      .then((fixture) => {
        let element = fixture.nativeElement;
        fixture.detectChanges();
        let form = element.querySelector('form');
        expect(form).toBeTruthy();
        expect(form.querySelector('input[name="username"]')).toBeTruthy();
        expect(form.querySelector('input[name="password"]')).toBeTruthy();
        done();
      });
  });
});
