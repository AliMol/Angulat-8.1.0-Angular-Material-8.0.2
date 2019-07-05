import { Component } from '@angular/core';
import {calls} from './calls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'call-center';

  constructor() {

    localStorage.setItem('calllist', JSON.stringify(calls));
  }
}
