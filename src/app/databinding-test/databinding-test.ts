import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding-test',
  imports: [FormsModule],
  templateUrl: './databinding-test.html',
  styleUrl: './databinding-test.css',
})
export class DatabindingTest {
  //1. interpolation and property binding
  title = 'Data Binding Test Component';
  urlImage = 'https://angular.io/assets/images/logos/angular/angular.png';
  isDisabled = false;

  //2. event binding
  count = 0;

  increment() {
    this.count++;
  }

  //3. two-way data binding
  name = 'Write something here...';
}
