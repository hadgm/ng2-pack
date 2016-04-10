import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class WikiService {
  private wikiUrl = 'http://en.wikipedia.org/w/api.php';

  constructor(
    private jsonp: Jsonp
  ){}

  public search(term: string) {
    console.log(term);
    let params = new URLSearchParams();
    let vars = {
      search: term,
      action: 'opensearch',
      format: 'json',
      callback: 'JSONP_CALLBACK',
    };

    Object.keys(vars).forEach(key => params.set(key, vars[key]));

    return this.jsonp.get(this.wikiUrl, {search: params})
      .map(response => <string[]>response.json()[1]);
  }
}
