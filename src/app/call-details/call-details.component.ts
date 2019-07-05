import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { callService } from '../service/call.service';

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.sass']
})

export class callDetailsComponent {

  call: any;
  @Output() notify = new EventEmitter();

  titleControl = new FormControl();
  firstnameControl = new FormControl();
  surnameControl = new FormControl();
  mobileControl = new FormControl();
  homeControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private callService: callService
  ) {

    this.call = Object.assign({}, this.callService.calldetail);
  }

  update(call){

    var retrievedObject = JSON.parse(localStorage.getItem('calllist'));
    for (var key in retrievedObject) {
      if (key == call.id) {
        retrievedObject[key]["title"] = call.title;
        retrievedObject[key]["firstname"] = call.firstname;
        retrievedObject[key]["surname"] = call.surname;
        retrievedObject[key]["mobilephone"] = call.mobilephone;
        retrievedObject[key]["homephone"] = call.homephone;
      }
    }
    localStorage.setItem('calllist', JSON.stringify(retrievedObject));
  }


  reset(){

    this.call = Object.assign({}, this.callService.calldetail);
  }

  complete(call){

    var retrievedObject = JSON.parse(localStorage.getItem('calllist'));
    for (var key in retrievedObject) {
      if (key == call.id) {
        retrievedObject[key]["status"] = 'COMPLETED';
      }
    }
    localStorage.setItem('calllist', JSON.stringify(retrievedObject));
    this.router.navigateByUrl('/');
  }
}
