import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getusers } from './getuser.service';
import { UsernamesandRoles } from './UsernamesandRoles.model';
import { returnusrdata } from './returnusrdata.model';
@Component({
  selector: 'app-popupcreate',
  templateUrl: './popupcreate.component.html',
  styleUrls: ['./popupcreate.component.scss']
})
export class PopupcreateComponent implements OnInit {
  form: FormGroup;
  // description: string;
  dataarray = [];
  user: any = {};

  name: any;
  role: any;

  allusers: UsernamesandRoles[];
  // description: any;
  constructor(private fb: FormBuilder, private getusr: getusers, private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<PopupcreateComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.description = data.description;
    this.getusr.getUsers().subscribe((x: UsernamesandRoles[]) => {
      this.allusers = x;
      console.log(this.allusers);

    })
  }

  ngOnInit() {


    this.form = this.fb.group({
      // name: [name ,[]],
      // role: ['', Validators.required]
      j: [''],
      level: [''],
      select: ['']


    });
  }
  save() {
    console.log(this.form.value);
    let tempusr: returnusrdata = new returnusrdata();
    tempusr.username = this.allusers[parseInt(this.form.get('j').value)].userName;
    tempusr.role = this.allusers[parseInt(this.form.get('j').value)].userRole;
    tempusr.level = this.form.get('level').value;


    this.dialogRef.close(tempusr)
  }
  change(value: string) {
    const usercontrol = this.form.get('j');
    const emailcontrol = this.form.get('level');
    if (value === 'user') {
      usercontrol.setValidators([Validators.required]);
      emailcontrol.clearValidators();
      emailcontrol.disable();
      usercontrol.enable();
    }
    if(value ==='user/Email'){
      emailcontrol.setValidators([Validators.required]);
      usercontrol.clearValidators();
      usercontrol.disable();
      emailcontrol.enable();
    }
   
    usercontrol.updateValueAndValidity();
    emailcontrol.updateValueAndValidity();
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    // console.log(this.form.value);
    // this.user = Object.assign(this.user, this.form.value);
    // this.addUser(this.user);
    // this.dialog.closeAll();
    this.dialogRef.close(this.form.value);

  }
  // addUser(user) {
  //   let users = [];
  //   if (localStorage.getItem('Users')) {
  //     users = JSON.parse(localStorage.getItem('Users'));
  //     users = [user, ...users];
  //   } else {
  //     users = [user];
  //   }
  //   localStorage.setItem('Users', JSON.stringify(users));


  // }
}
