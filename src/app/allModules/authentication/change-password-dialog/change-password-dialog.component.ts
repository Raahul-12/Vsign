import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationDetails, ChangePassword } from 'app/models/master';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CustomValidator } from 'app/shared/custom-validator';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChangePasswordDialogComponent implements OnInit {
  resetPasswordForm: FormGroup;
  changePassword: ChangePassword;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  authenticationDetails: AuthenticationDetails;

  constructor(
    public matDialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _router: Router

  ) {
    this.resetPasswordForm = this._formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, CustomValidator.confirmPasswordValidator]]
    });
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    this.authenticationDetails = new AuthenticationDetails();

  }

  ngOnInit(): void {
   
    // const retrievedObject = localStorage.getItem('authorizationData');
    // if (retrievedObject) {
    //   this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;

    // } else {
    //   this._router.navigate(['/auth/login']);
    // }
  }

  YesClicked(): void {



    if (this.resetPasswordForm.valid) {
      this.changePassword = new ChangePassword();
      this.changePassword.UserID = this.authenticationDetails.UserID;
      this.changePassword.UserName = this.authenticationDetails.UserName;
      this.changePassword.CurrentPassword = this.resetPasswordForm.get('currentPassword').value;
      this.changePassword.NewPassword = this.resetPasswordForm.get('newPassword').value;
      if (this.changePassword.CurrentPassword === this.changePassword.NewPassword) {
        this.notificationSnackBarComponent.openSnackBar('new password should be different from old password', SnackBarStatus.danger);
      } else {
        this.matDialogRef.close(this.changePassword);
      }
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        this.resetPasswordForm.get(key).markAsTouched();
        this.resetPasswordForm.get(key).markAsDirty();
      });

    }
  }

  CloseClicked(): void {
    // console.log('Called');
    this.matDialogRef.close(null);
  }

}
