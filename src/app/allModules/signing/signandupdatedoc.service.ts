import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createdoc } from '../document/models/createdoc.model';
import { DocAtt } from './Model/DocAtt.model';

@Injectable({
  providedIn: 'root'
})
export class SignandUpdatedocService {
  baseurl = 'http://192.168.0.28:7058/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  Signthedocument(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.baseurl + "api/SignDoc/GetDocumentSigned", formData);
  }
  Savethedocument(Doc:createdoc, DocId , Company , Client): Observable<any> {
    return this.httpClient.put<any>(this.baseurl + "api/SaveDoc/UpdateDoc?DocId="+DocId+"&Company="+Company+"&Client="+Client, Doc);
  }
  UpdatethedocAtt(Doc:DocAtt, DocId , Company , Client , AttId): Observable<any> {
    return this.httpClient.put<any>(this.baseurl + "api/Attachment/UpdateAttachment?DocId="+DocId+"&Company="+Company+"&Client="+Client+"&AttId="+AttId , Doc);
  }

  UpdateinPGSQL(id:string,formData:FormData){
    return this.httpClient.put<any>("http://192.168.0.28:7060/api/DocFiles/UpdateDocument?id="+id,formData);
  }

}
