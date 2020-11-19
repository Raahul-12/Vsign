import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../document/document.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

import { SnackBarStatus } from "app/notifications/notification-snack-bar/notification-snackbar-status-enum";
// function readBase64(file) {
//   var reader = new FileReader();
//   var future = new Promise((resolve, reject) => {
//     reader.addEventListener('load', function () {
//       resolve(reader.result);
//     }, false);

//     reader.addEventListener('error', function (event) {
//       reject(event);
//     }, false);

//     reader.readAsDataURL(file);
//   });
// }
import { from, of } from 'rxjs';
import { PopupcreateComponent } from './popupcreate/popupcreate.component';
import { createdoc } from './models/createdoc.model';
import { docatt } from './models/docatt.model';
import { docapp } from './models/docapp.model';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { concatMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {
  toppings = new FormControl();
  selection = {}
  toppingList: string[] = ['SignAadhar', 'SignCaPfx', 'SignCaToken', 'SignSelf'];
  popup: any;
  flagadduser: boolean = false;
  flagaddhide: boolean = false;
  date: Date = new Date();
  newdocid = "";
  newattid = "";
  select: any;
  removeItem(i: number): void {
    this.arr.splice(i, 1);
    this.arr1.splice(i, 1);
  }
  remove(item) {
    console.log("removed", item);
    this.files1.splice(this.files1.indexOf(item), 1);
  }
  // files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arr1, event.previousIndex, event.currentIndex);
  }
  files: File[] = [];
  name: string[] = [];
  name1: any;
  i: any;

  arr = [];
  arr1 = [];
  arr2 = [];
  flag: boolean = false;
  size: any;
  options: UploaderOptions;
  // formData: FormData;
  files1: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  formdata: FormData = new FormData();
  selected = 'option2';
  selected1 = 'option2';
  selected2 = 'option2';
  dueDate: Date;
  refno: string;
  user: string;
  username: string;
  role: string;
  email: string;
  snackbar: NotificationSnackBarComponent

  color = 'primary';
  mode = 'indeterminate';
  hidespin = false;
  form: FormGroup;

  constructor(private router: Router, private service: DocumentService, private snackBar: MatSnackBar, private Dialog: MatDialog, private fb: FormBuilder) {
    this.files1 = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.snackbar = new NotificationSnackBarComponent(this.snackBar)
    this.form = this.fb.group({
      user: ['', Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],

      select: ['', Validators.required]
    });
  }


  ngOnInit(): void {

  }
  ontick() {
    if (this.form.valid) {


      console.log(this.form.value);
      const usercontrol = this.form.get('user');
      const emailcontrol = this.form.get('email');
      // this.username = this.form.get('user').value;
      // this.role = this.form.get('email').value;
      // this.flagadduser = false;
      // this.arr2.push(this.form.value);
      // for (let i = 0; i < this.arr2.length; i++) {

      this.username = this.form.get('user').value;
      this.email = this.form.get('email').value;
      this.select = this.form.get('select').value;


      if ((this.username !== "" || this.email !== "") && (this.username !== null || this.email != null)) {
        this.arr1.push(this.form.value);
      }
      else {
        window.alert("Please select any one option");
      }
      console.log("arr", this.arr1);
      this.form.reset();
      this.flagaddhide = true;
    }
    else {
      window.alert("please select an option")
    }
  }
  change(value: string) {

    const usercontrol = this.form.get('user');
    const emailcontrol = this.form.get('email');


    // emailcontrol.enable();
    if (value === 'user') {
      emailcontrol.reset();
      usercontrol.setValidators([Validators.required]);
      emailcontrol.clearValidators();
      emailcontrol.disable();
      usercontrol.enable();
    }
    else if (value === 'user/Email') {
      usercontrol.reset();
      emailcontrol.setValidators(Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]));
      usercontrol.clearValidators();
      usercontrol.disable();
      emailcontrol.enable();
    }

    else if (value === '') {
      emailcontrol.setValidators([Validators.required]);
      emailcontrol.reset();
      usercontrol.enable();
      emailcontrol.enable();
      usercontrol.setValidators([Validators.required]);
    }

    usercontrol.updateValueAndValidity();
    emailcontrol.updateValueAndValidity();



  }
  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files1.push(output.file);
          console.log(this.files1);
          for (this.i = 0; this.i < this.files1.length; this.i++) {
            this.name1 = this.files1[this.i].name;
            this.size = this.files1[this.i].size;
            this.flag = true;
            console.log(this.name1);

            this.size = (this.files1[this.i].size) / 1024 * 1000 + "kb"
            console.log("size", this.size);
          }
          // alert("your file size "+ (this.files1[0].size)/1024 *1000 + "kb")
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files1.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files1[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files1 = this.files1.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }
  onCreate() {
    this.flagadduser = true;
    this.flagaddhide = false;
    // const dialogconfig = new MatDialogConfig();
    // dialogconfig.disableClose = true;
    // dialogconfig.autoFocus = true;
    // dialogconfig.hasBackdrop = true;




    // const dailogref = this.Dialog.open(PopupcreateComponent, dialogconfig)
    // dailogref.afterClosed().subscribe((data: any) => {
    //   console.log("dialogoutput", data),
    //     this.popup = data.username;

    //   if (data.username !== "" || data.role !== "") {

    //     this.arr.push(data);
    //   }

    //   console.log(this.arr);


    // const mapped = Object.keys(data).map(key => ({ type: key, value: data[key] }));
    // console.log(mapped);
    // this.popup1 = data.role;
    // console.log("name",this.username)

    // });

  }
  startUpload(): void {

    this.newdocid = this.date.getHours().toString() + this.date.getMinutes().toString() + this.date.getSeconds().toString() + this.date.getMilliseconds();
    //  console.log(this.newdocid);
    //  console.log(this.selected);
    //  console.log(this.selected1)


    this.hidespin = true;

    //  let obsfiles = of(this.files1);
    // let u =0;

    //  obsfiles.pipe(concatMap((entry) =>{
    //   this.formdata = new FormData();
    //   this.date= new Date();

    //   this.newattid = "v"+entry[u].id;


    //   this.formdata.append('DocId',this.newattid);
    //   this.formdata.append('FileName',entry[u].name);
    //   this.formdata.append('Files',entry[u].nativeFile);
    //   this.formdata.append('FileType',entry[u].type);
    //   this.formdata.append('Field1',"");
    //   this.formdata.append('Field2',"");
    //   this.formdata.append('Field3',"");
    // return  this.service.postfiletoPostGres(this.formdata)
    //  })).subscribe((l:any)=>{
    //   // let att:docatt = new docatt();
    //   // att.AttId = this.newattid;
    //   // att.Client = "surya"
    //   // att.Company = "Exalca"
    //   // att.DocId = this.newdocid;
    //   // att.Type = this.files1[u].type;
    //   // att.User = "surya";
    //   // console.log("completed doc upload to postgres");
    //   // // this.snackbar.openSnackBar("Please Wait..",SnackBarStatus.warning,2000);
    //   // this.service.postdatatodocatt(att).subscribe((m:any)=>{
    //   //   if(u==this.files1.length-1){
    //   //     let tempadoch:createdoc = this.addDocH();
    //   //     console.log("completed creating doctt");
    //   //     this.service.postdatatoDocH(tempadoch).subscribe((n:any)=>{
    //   //       u++;
    //   //     })

    //   //   }
    //   // }) 
    //   u++;
    // })


    this.formdata = new FormData();
    this.date = new Date();

    this.newattid = "v" + this.files1[0].id + (0).toString();
    console.log("files1", this.files1);
    console.log("files1", this.newattid);

    this.formdata.append('DocId', this.newattid);
    this.formdata.append('FileName', this.files1[0].name);
    this.formdata.append('Files', this.files1[0].nativeFile);
    this.formdata.append('FileType', this.files1[0].type);
    this.formdata.append('Field1', "");
    this.formdata.append('Field2', "");
    this.formdata.append('Field3', "");


    this.service.postfiletoPostGres(this.formdata).subscribe((l: any) => {
      console.log("l", l);
      let att: docatt = new docatt();
      att.AttId = this.newattid;
      att.Client = "surya"
      att.Company = "Exalca"
      att.DocId = this.newdocid;
      att.AttId1 = "None";
      att.Type = (this.files1[0].type).split('/')[1];
      att.User = "surya";
      console.log("completed doc upload to postgres");
      // this.snackbar.openSnackBar("Please Wait..",SnackBarStatus.warning,2000);
      this.service.postdatatodocatt(att).subscribe((m: any) => {

        let tempadoch: createdoc = this.addDocH();
        console.log(tempadoch);
        console.log("completed creating doctt");
        this.service.postdatatoDocH(tempadoch).subscribe((n: any) => {
          console.log("completed creating doch ");

          let tempdocapp: docapp = new docapp();
          tempdocapp.Client = tempadoch.Client;
          tempdocapp.Company = tempadoch.Company;
          tempdocapp.DocId = tempadoch.DocId;
          tempdocapp.Level = (0 + 1).toString();
          tempdocapp.User = this.arr[0].userId;
          this.service.postdatatodocapp(tempdocapp).subscribe((p: any) => {
            console.log("completed creating docapp");
            this.snackbar.openSnackBar("Document created successfully", SnackBarStatus.success, 2000);
            this.hidespin = false
            this.router.navigate(['signDoc']);
          },
            err => {
              this.snackbar.openSnackBar("Went wrong while creating document!", SnackBarStatus.danger, 2000);
            })


        },
          err => {
            this.snackbar.openSnackBar("Went wrong while creating document!", SnackBarStatus.danger, 2000);
          })

      })
    },
      err => {
        this.snackbar.openSnackBar("Went wrong while uploading files!", SnackBarStatus.danger, 2000)
      }
    )








  }

  addDocH() {


    // this.newdocid = "vs"+this.date.getDay().toString()+this.date.getMonth().toString()+this.date.getFullYear().toString()+this.date.getHours.toString()+this.date.getMinutes().toString()+this.date.getSeconds().toString()+this.date.getMilliseconds().toString();
    let tempdoc: createdoc = new createdoc();
    tempdoc.Client = "surya"
    tempdoc.Company = "Exalca"
    tempdoc.DocId = this.newdocid;
    tempdoc.Title = this.refno;
    tempdoc.FinalDueDate = this.dueDate;
    if (this.selected === "SignAadhar") {
      tempdoc.SignAadhaar = "Yes"
      tempdoc.SignCaPfx = "No"
      tempdoc.SignCaToken = "No"
      tempdoc.SignImage = "No"
      tempdoc.SignSelf = "No"
    }
    else if (this.selected === "SignCaPfx") {
      tempdoc.SignAadhaar = "No"
      tempdoc.SignCaPfx = "Yes"
      tempdoc.SignCaToken = "No"
      tempdoc.SignImage = "No"
      tempdoc.SignSelf = "No"
    }
    else if (this.selected === "SignCaToken") {
      tempdoc.SignAadhaar = "No"
      tempdoc.SignCaPfx = "No"
      tempdoc.SignCaToken = "Yes"
      tempdoc.SignImage = "No"
      tempdoc.SignSelf = "No"
    }
    else {
      tempdoc.SignAadhaar = "No"
      tempdoc.SignCaPfx = "No"
      tempdoc.SignCaToken = "No"
      tempdoc.SignImage = "No"
      tempdoc.SignSelf = "Yes"
    }
    tempdoc.DistInit = "No"
    tempdoc.DistMail = "No"
    tempdoc.DistDms = "No"
    tempdoc.DistAll = "No"
    tempdoc.FileName = ""
    tempdoc.FileExt = ""
    tempdoc.FileMd5 = ""
    tempdoc.FileSize = ""
    tempdoc.FileType = ""
    tempdoc.LastSignedBy = "None"
    tempdoc.LastSingedDate = ""
    tempdoc.Status = "Draft"
    tempdoc.CreatedOn = new Date();
    tempdoc.CreatedBy = "surya"
    tempdoc.ModifiedOn = new Date();
    tempdoc.ModifiedBy = "surya"

    return tempdoc;
  }

  // cancelUpload(id: string): void {
  //   this.uploadInput.emit({ type: 'cancel', id: id });
  // }

  // removeFile(id: string): void {
  //   this.uploadInput.emit({ type: 'remove', id: id });
  // }

  // removeAllFiles(): void {
  //   this.uploadInput.emit({ type: 'removeAll' });
  // }
}
class DocFormData {

  DocId: string
  FileName: string
  Files: Uint8Array;
  FileType: string
  Field1: string
  Field2: string
  Field3: string
}