import {Component} from 'angular2/core';
import {JSONP_PROVIDERS} from 'angular2/http';
import {WikiService} from './../../services/wiki.service.ts';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'wiki',
  templateUrl: require('./wiki.tpl.html'),
  providers: [
    JSONP_PROVIDERS,
    WikiService,
  ],
})
export class WikiComponent {

  public searchTermStream = new Subject<string>();
  public items: Observable<string[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this.wiki.search(term));

  constructor(
    private wiki: WikiService
  ) {}

  public search(term: string) {
    this.searchTermStream.next(term);
  }
}
