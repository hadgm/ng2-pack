import {
  Component,
  Input,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'file-input',
  template: ``
})
export class FileInputComponent {

  constructor(
    private host: ElementRef
  ) {}
}
