import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetattachmentdetailsService {
  baseurl = 'http://192.168.0.28:7058/';
  baseurl1 = 'http://192.168.0.28:7060/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  getAttachmentDetails(client: string, company: string, DocId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl + "api/Attachment/getAttDetails?DocId=" + DocId + "&Company=" + company + "&Client=" + client);
  }
  getAttachmentPosgresql(AttachmentId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl1 + "api/DocFiles/GetDocument?id=" + AttachmentId);
  }
}
