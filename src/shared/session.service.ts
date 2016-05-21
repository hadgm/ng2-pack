import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface SessionInfo {
  username: string;
  token: string;
  createdAt: Date;
}

@Injectable()
export class Session {
  private _sessionInfo: SessionInfo;

  create(credential: Credential): Observable<SessionInfo | Error> {
    if (credential.username === 'john') {
      this._sessionInfo = Object.assign({}, {
        username: credential.username,
        createdAt: new Date(),
      });
      return Observable.of(this._sessionInfo);
    }

    return Observable.throw({
      name: 'ErrorInvalidCredential',
      message: 'Sorry, I don\'t know you',
    } as Error);
  }

  get info() {
    return this._sessionInfo;
  }

}
