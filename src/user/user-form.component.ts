import {
  Component,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  ControlGroup,
} from '@angular/common';

@Component({
  selector: 'user-form',
  providers: [FormBuilder],
  templateUrl: require('./user-form.tpl.html'),
  styles: [require('./user.component.scss')],
})
export class UserFormComponent {
  @Input('model')
  public user: User;
  private formModel: ControlGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formModel = formBuilder.group({});
  }
}
