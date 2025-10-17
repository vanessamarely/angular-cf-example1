import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  //inner variable to hold the color value
  private _color: string = 'yellow';

  //add ElementRef and Renderer2 to modify the DOM element
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @Input('appHighlight')
  set highlightColor(color: string) {
    this._color = color || 'yellow'; //default to yellow if no color is provided
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor(this._color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor(null);
  }

  private changeBackgroundColor(color: string | null) {
    //use the Renderer to modify the element's style
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
