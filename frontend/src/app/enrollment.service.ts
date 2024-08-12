import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  _url = '';
  constructor(private _http: HttpClient) {}
}
