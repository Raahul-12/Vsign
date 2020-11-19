import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { digital } from './signing';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  baseurl = 'http://192.168.0.28:5010/vsignapi/VSign/GetVSigns';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  }
  getDB(): Observable<digital[]> {
    return this.httpClient.get<digital[]>(`${this.baseurl}`);
  }
}
