import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FORM_DIRECTIVES,
  ControlGroup,
  Validators,
} from '@angular/common';
import { Session } from '../shared/session.service.ts';

@Component({
  selector: 'w-login',
  templateUrl: require('./login.tpl.html'),
  styles: [require('./login.component.scss')],
  providers: [FormBuilder],
  directives: [FORM_DIRECTIVES],
})
export class LoginComponent {
  private crededetial: Credential = {} as Credential;
  private form: ControlGroup;
  private formError: { [key: string]: any } = {};
  private isSubmitted: boolean = false;
  private error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private session: Session
  ) {}

  ngOnInit() {
    this.buildForm();
    this.subscribeFormChange();
  }

  get showError() {
    return this.isSubmitted ? this.formError : {};
  }

  public handleSubmit() {
    this.validateForm();
    this.isSubmitted = true;

    if (!this.form.valid) {
      return;
    }

    this.session.create(this.form.value)
      .subscribe(
        _ => {
          this.router.navigate(['/']);
        },

        error => {
          this.error = error.message;
        }
      );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: [this.crededetial.username, Validators.required],
      password: [this.crededetial.password, Validators.required],
    });
  }

  private subscribeFormChange() {
    this.form.valueChanges.subscribe(change => {
      this.validateForm();
    });
  }

  private validateForm() {
    let {controls} = this.form;
    Object.keys(controls).forEach(name => {
      let control = controls[name];
      if (!control.valid) {
        this.formError[name] = Object.keys(control.errors);
      } else {
        this.formError[name] = undefined;
      }
    });
  }
}
