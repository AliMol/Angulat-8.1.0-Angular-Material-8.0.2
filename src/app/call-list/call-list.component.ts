import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { calls } from '../calls';
import { callService } from '../service/call.service';

export interface callElement {
  title: string;
  datesold: string;
  status: string;
  select: boolean;
}

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.sass']
})
export class callListComponent {

  fromdate: Date;
  todate: Date;
  detailcall: any;

  displayedColumns: string[] = ['select', 'title', 'datesold', 'status'];
  dataSource = calls;

  public types = [
    {"id": 0, "name": "SALES"},
    {"id": 1, "name": "SERVICE"}
  ];
  public statuses = [
    {"name": "NEW"},
    {"name": "IN USE"},
    {"name": "COMPLETED"}
  ];
  minDate = new Date(2018, 0, 1);
  maxDate = new Date(2022, 0, 1);

  typeControl = new FormControl();
  statusControl = new FormControl();

  constructor(private callService: callService,
              private router: Router) {

    this.dataSource = JSON.parse(localStorage.getItem('calllist'));
  }


  search() {

    var retrievedObject = localStorage.getItem('calllist');
    this.dataSource = JSON.parse(retrievedObject).filter(
      item => (item.type == this.typeControl.value &&
                        item.status == this.statusControl.value &&
                        new Date(item.datesold) >= this.fromdate &&
                        new Date(item.datesold) <= this.todate));
  }

  reverseSelection(call) {

    this.detailcall = call;
    this.dataSource.forEach((item, index) => {
      if (item != call){

        this.dataSource[index]["select"] = false;
      }
    });
  }

  calldetail(){

    if(this.detailcall) {

      this.callService.calldetail = this.detailcall;
      this.router.navigateByUrl('/calldetail');
    }
  }
}
