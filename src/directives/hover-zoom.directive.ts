import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[hover-zoom]',
  host: {
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class HoverZoom {
  @Input('hoverZoom')
  public scale = 1.2;
  private el: HTMLElement;

  constructor(
    el: ElementRef
  ) {
    this.el = el.nativeElement;
    this.el.style.position = 'absolute';
  }

  protected handleMouseEnter() {
    this.setZoom(this.scale);
  }

  protected handleMouseLeave() {
    this.setZoom(1);
  }

  private setZoom(scale) {
    this.el.style.transform = `scale(${scale})`;
  }

}
