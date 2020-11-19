
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digital } from './signing';
import { SignatureService } from '../signing/signature.service';
import { MatDialog, MatDialogConfig, throwToolbarMixedModesError } from '@angular/material';
import { SigndocumentComponent } from './signdocument/signdocument.component';
import { GetattachmentdetailsService } from './getattachmentdetails.service';
import { DocAtt } from './Model/DocAtt.model';
import { DocReturnData } from './Model/returnfile.model';
import { SignandUpdatedocService } from './signandupdatedoc.service';
import { DocumentService } from '../document/document.service';
import { createdoc } from '../document/models/createdoc.model';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})


export class SigningComponent implements OnInit {
  docatt: DocAtt[];
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  returnfile: DocReturnData = new DocReturnData();
  requiredfile: File;
  fsrc: any;
  selectedoptionfromdialog: string = "";
  totalPages: any;
  pdfSrc: any;
  temp: FormData;
  hideSignbutton = true;
  digital1: digital[];
  flag: boolean = false;
  signaturePad: any;
  flag1: boolean = false;
  mode = '';
  mode1 = '';
  mode2 = '';
  mode3 = '';
  mode4 = '';
  mode5 = '';
  imageSrc = '';
  images = [];
  messageText = '';
  form: FormGroup;
  signatureImage: any;
  
  constructor(private fb: FormBuilder,private docService:DocumentService ,private signservice: SignatureService,private GetsignService:SignandUpdatedocService ,private Dialog: MatDialog, private attachmentdetails: GetattachmentdetailsService) {
    this.form = this.fb.group({
      FileType: [''],
      FilePages: [''],
      FileSize: [''],
      FileType1: [''],
      FilePages1: [''],
      FileSize1: [''],
      CurrentApprover: ['', Validators.required]
    });
  }


  imageButtons: any[] = [{

    src: '../../assets/image/vsign/letter.png', name: 'image - 2'
  },
  { src: '../../assets/image/vsign/letter.png', name: 'image-3' }, { src: '../../assets/image/vsign/letter.png', name: 'image-4' }];
  images1: any = { src: '../../assets/image/vsign/letter.png' }

  showImage(data) {
    this.signatureImage = data;
  }
  Onpen() {
    this.flag = true;
  }
  onCreate() {

    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
   

    const data = this.Dialog.open(SigndocumentComponent, dialogconfig);
    data.afterClosed().subscribe(data => {
      // console.log(data);
      if (data != "") {
        if (data === "all") {
          this.selectedoptionfromdialog = "All"
        }
        else if (data === "last") {
          this.selectedoptionfromdialog = this.totalPages + "_";
        }
        else if (data === "1_") {
          this.selectedoptionfromdialog = "1_"
        }
        else {
          this.selectedoptionfromdialog = data;
        }


        console.log(this.selectedoptionfromdialog);
        // this.selectedoptionfromdialog = "2_3_5";
        this.temp = new FormData();
  
        this.temp.append('config1', 'ZCRN');
        this.temp.append('config2', '2000');
        this.temp.append('config3', 'PO');
        this.temp.append('signername', "2343");
        this.temp.append('file', this.requiredfile);
        this.temp.append('Custompages', this.selectedoptionfromdialog);
        this.GetsignService.Signthedocument(this.temp).subscribe((x:any)=>{
          console.log(x.pdfcontent)
          
          const signedBlob = this.dataURItoBlob(x.pdfcontent);
          const signedFile = new File([signedBlob],"signed"+this.requiredfile.name,{'type':this.requiredfile.type});
          let formdata:FormData = new FormData();
          formdata.append('DocId',"sd"+this.returnfile.docId);
      formdata.append('FileName',signedFile.name);
      formdata.append('Files',signedFile);
      formdata.append('FileType',signedFile.type);
      formdata.append('Field1',"");
      formdata.append('Field2',"");
      formdata.append('Field3',"");
      console.log("signed doc");
      
        this.docService.postfiletoPostGres(formdata).subscribe((y:any)=>{
            let cDoc:createdoc = new createdoc();
            cDoc.Status = "Completed";
            cDoc.Client = localStorage.getItem("Selectedclient");
            cDoc.Company = localStorage.getItem("Selectedcompany");
            cDoc.DocId = localStorage.getItem("SelecteddocId");
          console.log("updated postres");
          
          this.GetsignService.Savethedocument(cDoc,cDoc.DocId,cDoc.Company,cDoc.Client).subscribe((z:any)=>{
            let cAtt: DocAtt = new DocAtt();
            cAtt.attId1 = "sd"+this.docatt[0].attId
            cAtt.type  = this.docatt[0].type;
            cAtt.user = this.docatt[0].user;
            console.log("updated saveatt");
            
            this.GetsignService.UpdatethedocAtt(cAtt,cDoc.DocId,cDoc.Company,cDoc.Client,this.docatt[0].attId).subscribe((l:any)=>{
             console.log("updated docatt");
             this.pdfViewerAutoLoad.pdfSrc = signedBlob; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); 
              
              var reader = new FileReader();
              reader.readAsDataURL(signedFile);
              reader.onload = (event) => {
                this.pdfSrc = reader.result;
    
              }
            })
          })
        }) 
          
         
        })
      }
     
    })



    // console.log(this.arr);
    // const mapped = Object.keys(data).map(key => ({ type: key, value: data[key] }));
    // console.log(mapped);
    // this.popup1 = data.role;
    // console.log("name",this.username)



  }
  ngOnInit(): void {
    const client = localStorage.getItem("Selectedclient");
    console.log("client", client);
    const company = localStorage.getItem("Selectedcompany");
    const docId = localStorage.getItem("SelecteddocId");
    const com_client = localStorage.getItem("completeclient");
    const com_company = localStorage.getItem("completecompany");
    const com_docId = localStorage.getItem("completedocId");
   if(client!=null && company!=null && docId!=null){
    this.attachmentdetails.getAttachmentDetails(client, company, docId).subscribe(
      (data) => {
        this.hideSignbutton =true;
        this.docatt = data
        console.log(this.docatt[0].type)
        this.attachmentdetails.getAttachmentPosgresql(this.docatt[0].attId).subscribe(
          (data1) => {
            
            this.returnfile = data1;
            console.log("data1", this.returnfile);
            console.log(this.returnfile.files);
            const fileblob = this.dataURItoBlob(this.returnfile.files);
            this.requiredfile = new File([fileblob], this.returnfile.fileName, {
              'type': this.returnfile.fileType,

            })
            this.pdfViewerAutoLoad.pdfSrc = fileblob; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); 
            var reader = new FileReader();
            reader.readAsDataURL(this.requiredfile);
            reader.onload = (event) => {
              this.pdfSrc = reader.result;

            }
            // this.fsrc = window.URL.createObjectURL(this.requiredfile);
            // this.pdfSrc = this.fsrc;
          }
        )
      }
    )
   }
   else{
    this.attachmentdetails.getAttachmentDetails(com_client, com_company,com_docId).subscribe(
      (data) => {
         this.hideSignbutton=false;
        this.docatt = data
        console.log(this.docatt[0].type)
        this.attachmentdetails.getAttachmentPosgresql(this.docatt[0].attId1).subscribe(
          (data1) => {

            this.returnfile = data1;
            console.log("data1", this.returnfile);
            console.log(this.returnfile.files);
            const fileblob = this.dataURItoBlob(this.returnfile.files);
            this.requiredfile = new File([fileblob], this.returnfile.fileName, {
              'type': this.returnfile.fileType,

            })
            this.pdfViewerAutoLoad.pdfSrc = fileblob; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); 
            var reader = new FileReader();
            reader.readAsDataURL(this.requiredfile);
            reader.onload = (event) => {
              this.pdfSrc = reader.result;

            }
            // this.fsrc = window.URL.createObjectURL(this.requiredfile);
            // this.pdfSrc = this.fsrc;
          }
        )
      }
    )
   }

    // this.images.push(this.imageButtons);
    // console.log(this.images);
    console.log("img", this.imageButtons);
    // this.imageButtons[0];
    this.signservice.getDB().subscribe(
      (data) => {
        console.log(data);
        this.digital1 = data;
        this.mode = this.digital1[0].FileType;
        this.mode1 = this.digital1[0].FilePages;
        this.mode2 = this.digital1[0].FileSize;
        this.mode3 = this.digital1[1].FileType;
        console.log(this.mode3);

        this.mode4 = this.digital1[1].FilePages;
        this.mode5 = this.digital1[1].FileSize;
        console.log(this.mode4);
        console.log(this.mode5);
        // this.mode3 = this.digital1[0].CurrentApprover;
        (err) => console.log(err)
      }
      // console.log(this.employee);
    );
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array]);
    return blob;
  }
  print(): void {
    window.print();
  }
  afterLoadComplete(count: number): void {
    this.totalPages = count;
    console.log(this.totalPages);
  }
  onClick(imagebutton) {
    this.imageSrc = imagebutton.src;
    this.messageText = imagebutton.name;
    this.flag1 = true;
  }
}
