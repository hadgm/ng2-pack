```
<component
  [prop]="expression" <!--properties bindings, bind to DOM properties -->
  (click)="statement" //event binding
  [(ngModel)]="value" // two way bindings
  attrName="string" // bind once, string value only
  [attr.title]="Xpression" // attribute binding
  [class.abc]="expression"
  [style.camelCaseProp]="expression"
  /\*(ngIf|ngFor|ngSwitchWhen|ngSwitchDefault)/ = "statement" // this will change DOM flow
  *ngFor="#item of iterable; #id = index" // `#v` say that we declare new local variale
  #variable //here `variable` refer to DOM node itself
  #theForm="ngForm" // `theForm` refer to ngForm, exported value we set in component declare decorator
>
  {{name}} //interpolate
</component>

```

*directive indicate following html is template, don't render it at first