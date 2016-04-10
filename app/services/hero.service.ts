import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
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
      .catch(this.handleError);
  }

  private handleError(err: Response) {
    console.error(err);
    return Observable.throw(err.json().error || 'Server error');
  }

}
