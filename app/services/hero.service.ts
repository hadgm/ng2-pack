import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
  private endpoint: string = '//localhost:3000/heroes';

  constructor(
    private http: Http
  ) {}

  public getHeroes() {
    return this.http.get(this.endpoint) // return an observable
      .map(res => {
        return res.json() as app.IHero[];
      })
      .catch(this.handleError);
  }

  public getHeroById(id) {
    return this.http.get(this.endpoint + '/' + id)
      .map(res => res.json() as app.IHero)
      .do(data => console.info('DATA: ', JSON.stringify(data)))
      .catch(this.handleError);
  }

  public updateHero(data): Observable<app.IHero> {
    if (!data._id) {
      Observable.throw('No hero id');
    }

    let body = JSON.stringify(data);
    let option = new RequestOptions({
      headers: new Headers({'content-type': 'application/json'})
    });

    return this.http.put(this.endpoint + '/' + data._id, body, option)
      .map(res => res.json() as app.IHero)
      .catch(this.handleError);
  }

  private handleError(err: Response) {
    console.error(err);
    return Observable.throw(err.json().error || 'Server error');
  }

}
