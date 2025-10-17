import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabindingTest } from './databinding-test/databinding-test';
import { TestDirectives } from './test-directives/test-directives';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatabindingTest, TestDirectives],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-example');
}
