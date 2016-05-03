import {
  describe,
  ddescribe,
  it,
  expect,
  inject,
  beforeEachProviders,
  beforeEach,
} from 'angular2/testing';
import {
  Http,
  BaseResponseOptions,
  Response,
  ResponseOptions,
} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import {HeroService} from './hero.service.ts';

const HeroList: Hero[] = [
  {_id: '1', name: 'Razor'},
];

describe('HeroService', () => {
  let backend: MockBackend;
  let heroService: HeroService;

  beforeEachProviders(() => [
    MockBackend,
    HeroService,
    BaseResponseOptions,
    provide(Http, {
      useFactory: (_backend, options) => new Http(_backend, options),
      deps: [MockBackend, BaseResponseOptions],
    }),
  ]);

  beforeEach(inject([MockBackend, HeroService], (mockBackend_, heroService_) => {
    backend = mockBackend_;
    heroService = heroService_;
  }));

  it('should get hero list', () => {
    /**
     * assumtion
     */
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: {data: HeroList},
      })));
    });

    heroService.getHeroes()
      .subscribe(
        (res) => {
          expect(res.data).toBeAnInstanceOf(Array);
          expect(res.data[0]).toBeDefined();
          expect(res.data[0]._id).toBeDefined();
        }
      );
  });
});
