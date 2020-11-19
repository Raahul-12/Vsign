import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class getusers{
    baseurl = 'http://192.168.0.28:7058/';


    constructor(private httpClient: HttpClient) { }

    getUsers():Observable<any>{
      return this.httpClient.get(this.baseurl+"api/master/GetAllUsersWithRolenames");
    }
  }