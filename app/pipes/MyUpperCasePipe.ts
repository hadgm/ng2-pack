import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'myUpperCase'})
export class MyUpperCasePipe implements PipeTransform {
  public transform(a: string) {
    return a.toUpperCase();
  }
}
