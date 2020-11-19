import { Component, OnInit } from '@angular/core';
import { UserWithRole } from 'app/models/master';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  AllSettings: any
  searchText = '';
  selectID: number;
  selectedUser: Guid;
  ngOnInit() {
    this.AllSettings = [
      { Name: "Classification", CreatedOn: "11/11/2020", AppID: "0" },
      { Name: "Templates", CreatedOn: "11/11/2020", AppID: "1" },
      { Name: "Connectors", CreatedOn: "11/11/2020", AppID: "2" },
      { Name: "Notification", CreatedOn: "11/11/2020", AppID: "3" }
    ]
    console.log(this.AllSettings);
  }
  loadSelectedUser(i: number): void {
    this.selectID = i;

    // console.log(this.selectID);
    // this.selectedUser = selectedUser;
  }
  // SetUserValues(): void {
  //   this.userMainFormGroup.get('userName').patchValue(this.selectedUser.UserName);
  //   this.userMainFormGroup.get('displayName').patchValue(this.selectedUser.DisplayName);
  //   this.userMainFormGroup.get('roleID').patchValue(this.selectedUser.RoleID);
  //   this.userMainFormGroup.get('email').patchValue(this.selectedUser.Email);
  //   this.userMainFormGroup.get('contactNumber').patchValue(this.selectedUser.ContactNumber);
  // }




}
