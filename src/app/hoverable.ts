import { Directive, HostBinding, Input } from '@angular/core';
import { Highlight } from './highlight';

@Directive({
  selector: '[appHoverable]',
  hostDirectives: [{ directive: Highlight, inputs: ['appHighlight: appHoverable'] }],
})
export class Hoverable {
  @HostBinding('style.cursor') cursor = 'pointer';

  @Input() appHoverable: string = '';
  constructor() {}
}
