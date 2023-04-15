import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Searchrequest } from './searchrequest';
import { Searchresponse } from './searchresponse';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private httpClient : HttpClient) {
  }

  getPlanNames() : Observable<any>{
    return this.httpClient.get<any>("https://ashokit-dynamic-search.herokuapp.com/plannames");
  }

  getPlanStatus(): Observable<any>{
    return this.httpClient.get<any>("https://ashokit-dynamic-search.herokuapp.com/planstatus");
  }

  search(request : Searchrequest) : Observable<Searchresponse[]>{
    return this.httpClient.post<Searchresponse[]>(`https://ashokit-dynamic-search.herokuapp.com/plans`, request);
  }

  getExcel() {
    return this.httpClient.get<any>(`https://ashokit-dynamic-search.herokuapp.com/excel`, {responseType : 'arraybuffer' as 'json'});
  }

  getPdf() {
    return this.httpClient.get<any>(`https://ashokit-dynamic-search.herokuapp.com/pdf`, {responseType : 'arraybuffer' as 'json'});
  }

}