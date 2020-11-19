import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../dashboard/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseurl = 'http://192.168.0.28:7058/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  getbydate(fdate: string, todate: string) {
    return this.httpClient.get<any>(this.baseurl + "api/getDocList/getAllDocuments?FromDate=" + fdate + "&ToDate=" + todate);
  }
  getbyfromdate(fdate: string) {
    return this.httpClient.get<any>(this.baseurl + "api/getDocList/getAllDocuments?FromDate=" + fdate);
  }
  getbytodate(todate: string) {
    return this.httpClient.get<any>(this.baseurl + "api/getDocList/getAllDocuments?ToDate=" + todate);
  }
  getTableContents(client: string, company: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl + "api/getDocList/getAllDocuments?Client=" + client + "&Company=" + company);
  }

  getKPI(client: string, company: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl + "api/getKPI/getSignedDocsCount?Client=" + client + "&Company=" + company);
  }

  getProgress(client: string, company: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl + "api/getProgress/getSigningProcess?Client=" + client + "&Company=" + company);
  }
  getTags(client: string, company: string): Observable<any> {
    return this.httpClient.get<any>(this.baseurl + "api/getTag/getAllTags");
  }
}
