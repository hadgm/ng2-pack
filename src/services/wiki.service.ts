import {Jsonp, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface IWikiItem {
  name: string;
  url: string;
  description: string;
}

@Injectable()
export class WikiService {
  private wikiUrl = 'http://en.wikipedia.org/w/api.php';

  constructor(
    private jsonp: Jsonp
  ) {
    //
  }

  public search(term: string): Observable<IWikiItem[]> {
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
      .map(response => {
        let data = response.json();
        return data[1].map((name, index) => {
          return <IWikiItem> {
            name,
            description: data[2][index],
            url: data[3][index],
          };
        });
      });
  }
}
