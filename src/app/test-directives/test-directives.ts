import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../highlight';
import { Hoverable } from '../hoverable';

@Component({
  selector: 'app-test-directives',
  imports: [CommonModule, Highlight, Hoverable],
  templateUrl: './test-directives.html',
  styleUrl: './test-directives.css',
})
export class TestDirectives {
  showElement = true;

  toggle() {
    this.showElement = !this.showElement;
  }

  list = ['Angular', 'React', 'Vue', 'Svelte'];
}
