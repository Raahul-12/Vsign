import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createdoc } from './models/createdoc.model';
import { docapp } from './models/docapp.model';
import { docatt } from './models/docatt.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }
  private baseUrlpostGres = 'http://192.168.0.28:7060/api/DocFiles/AddDocument';
  private baseUrlVsign = 'http://192.168.0.28:7058/';
  //   headers={
  //     headers: new HttpHeaders({
  //       'enctype': 'multipart/form-data',
  //       'Accept': 'application/json'
  //     })
  // };
  postfiletoPostGres(formdata: any): Observable<any> {
    console.log("formdata",formdata);
    return this.http.post<any>("http://192.168.0.28:7060/api/DocFiles/AddDocument", formdata);
    
  }

  postdatatoDocH(doc: createdoc) {
    console.log("doc", doc);

    return this.http.post<any>(this.baseUrlVsign + "api/CreateDoc/AddDocH", doc);
  }

  postdatatodocapp(app: docapp) {
    console.log(app);


    return this.http.post<any>(this.baseUrlVsign + "api/CreateDoc/AddDocApp", app);
  }

  postdatatodocatt(att: docatt) {
    console.log(att);

    return this.http.post<any>(this.baseUrlVsign + "api/CreateDoc/AddDocAtt", att);
  }





}
