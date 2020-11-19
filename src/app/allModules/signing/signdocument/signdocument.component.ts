import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signdocument',
  templateUrl: './signdocument.component.html',
  styleUrls: ['./signdocument.component.scss']
})
export class SigndocumentComponent implements OnInit {
  selected1 = 'option2';
  selectedoption: string;
  returndata: string;
  inputfromcustom: string;
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SigndocumentComponent>, @Inject(MAT_DIALOG_DATA) data) {
    // this.getusr.getUsers().subscribe((x:UsernamesandRoles[])=>{
    //   this.allusers=x;
    //   console.log(this.allusers);

    // })
  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   firstpage: [''],
    //   lastpage: [''],
    //   allpages: [''],
    //   custom: ['']

    // });
  }
  signdocument() {
    // this.dialogRef.close();
    console.log(this.selectedoption);
    if(this.selectedoption === "first"){
      this.returndata = "1_";
    }
    else if(this.selectedoption === "last"){
      this.returndata = "last";
    }
    else if(this.selectedoption === "all"){
      this.returndata = "all";
    }
    else{
      this.returndata = this.inputfromcustom;
    }

    this.dialogRef.close(this.returndata);
  }
}
